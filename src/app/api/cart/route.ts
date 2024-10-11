// app/api/cart/route.ts
import { NextRequest } from 'next/server';
import ProductCartRepository from '@/backend/repositories/productCartRepository';

// GET /api/cart?userId=1
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const userId = parseInt(searchParams.get('userId') || '', 10);

  if (isNaN(userId)) {
    return Response.json({ error: 'Invalid user ID' }, { status: 400 });
  }

  try {
    const products = await ProductCartRepository.findAllProductsInCartByUserId(userId);
    return Response.json(products);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const { userId, productId, quantity, operation } = await req.json();

  if (operation === 'insert')
    if (!userId || !productId || isNaN(quantity) || !operation) {
      return Response.json({ error: 'Invalid input data' }, { status: 400 });
    }
  else if (operation === 'remove') {
    if (!userId || !productId) {
      return Response.json({ error: 'Invalid input data' }, { status: 400 });
    }
  }

  try {
    let response
    if (operation === 'insert') {
      response = await ProductCartRepository.addProductToCart(parseInt(userId), parseInt(productId), parseInt(quantity));
    } else if (operation === 'remove') {
      response = await ProductCartRepository.removeProductFromCart(parseInt(userId), parseInt(productId))
    } else {
      response = { error: "Informe o tipo de operação ('insert' ou 'remove')" }
    }
    return Response.json(response);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}
