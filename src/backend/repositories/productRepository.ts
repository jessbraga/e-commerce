import { PrismaClient, Product } from "@prisma/client";

export default class ProductRepository {
  private static db: PrismaClient = new PrismaClient()

  static findAll(where: Object = {}) : Promise<Product[]> {
    return this.db.product.findMany(where)
  }

  static createOne(productData: any) : Promise<Product> {
    return this.db.product.create({
      data: { ...productData }
    })
  }

  static deleteOne(id: number) : Promise<Product> {
    return this.db.product.delete({
      where: { id: id }
    })
  }
}