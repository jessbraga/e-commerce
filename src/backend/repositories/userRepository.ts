import { PrismaClient } from "@prisma/client";

export default class UserRepository {
  private static db: PrismaClient = new PrismaClient()

  static async findAll() {
    return await this.db.user.findMany()
  }

  static async findOneById(id: number) {
    return await this.db.user.findFirstOrThrow({
      where: { id: id }
    })
  }
}