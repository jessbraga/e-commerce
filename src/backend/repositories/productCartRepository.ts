import { PrismaClient, Product } from "@prisma/client";

export default class ProductCartRepository {
  private static db: PrismaClient = new PrismaClient()

  
  static async findAllProductsInCartByUserId(userId: number) {
    const cart = await this.db.cart.findFirst({
      where: {
        user: {
          some: { id: userId },
        },
      },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!cart) {
      throw new Error('Carrinho não encontrado para o usuário.');
    }

    return cart.items.map(item => ({
      product: item.product,
      quantity: item.quantity,
    }));
  }

  static async addProductToCart(userId: number, productId: number, quantity: number = 1) {
    const product = await this.db.product.findUnique({
      where: { id: productId },
    });

    if (!product) {
      throw new Error('Produto não encontrado.');
    }

    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { userCart: true },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const existingCartItem = await this.db.cartItem.findUnique({
      where: {
        cartId_productId: {
          cartId: user.cartId,
          productId,
        },
      },
    });

    const currentQuantity = existingCartItem ? existingCartItem.quantity : 0;
    const totalRequestedQuantity = currentQuantity + quantity;

    if (totalRequestedQuantity > product.stock) {
      return { error: `A quantidade total solicitada (${totalRequestedQuantity}) excede o estoque disponível (${product.stock}).` };
    }

    // Adiciona ou atualiza a quantidade do produto no carrinho
    const cartItem = await this.db.cartItem.upsert({
      where: {
        cartId_productId: {
          cartId: user.cartId,
          productId,
        },
      },
      update: {
        quantity: totalRequestedQuantity,
      },
      create: {
        cartId: user.cartId,
        productId,
        quantity,
      },
    });

    return cartItem;
  }

  static async removeProductFromCart(userId: number, productId: number) {
    const user = await this.db.user.findUnique({
      where: { id: userId },
      include: { userCart: true },
    });

    if (!user) {
      throw new Error('Usuário não encontrado.');
    }

    const deletedCartItem = await this.db.cartItem.deleteMany({
      where: {
        cartId: user.cartId,
        productId,
      },
    });

    if (deletedCartItem.count === 0) {
      throw new Error('Produto não encontrado no carrinho.');
    }

    return deletedCartItem;
  }
}