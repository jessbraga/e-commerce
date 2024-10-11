/*
  Warnings:

  - The primary key for the `ProdutoNoCarrinho` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo_carrinho` on the `ProdutoNoCarrinho` table. All the data in the column will be lost.
  - Added the required column `codigo_carrinho` to the `ProdutoNoCarrinho` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProdutoNoCarrinho" (
    "codigo_carrinho" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "codigo_produto" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" REAL NOT NULL DEFAULT 0.00,
    "quantidade" INTEGER NOT NULL,
    "email_cliente" TEXT NOT NULL,
    "email_vendedor" TEXT NOT NULL,
    "codigo_venda" INTEGER NOT NULL
);
INSERT INTO "new_ProdutoNoCarrinho" ("codigo_produto", "codigo_venda", "descricao", "email_cliente", "email_vendedor", "nome", "quantidade", "valor") SELECT "codigo_produto", "codigo_venda", "descricao", "email_cliente", "email_vendedor", "nome", "quantidade", "valor" FROM "ProdutoNoCarrinho";
DROP TABLE "ProdutoNoCarrinho";
ALTER TABLE "new_ProdutoNoCarrinho" RENAME TO "ProdutoNoCarrinho";
CREATE UNIQUE INDEX "ProdutoNoCarrinho_codigo_carrinho_key" ON "ProdutoNoCarrinho"("codigo_carrinho");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
