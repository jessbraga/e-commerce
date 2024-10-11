/*
  Warnings:

  - You are about to drop the column `imagem` on the `ProdutoAVenda` table. All the data in the column will be lost.
  - You are about to drop the column `imagem` on the `ProdutoVendido` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_ProdutoAVenda" (
    "nome" TEXT NOT NULL,
    "codigo_produto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "valor" REAL NOT NULL DEFAULT 0.00,
    "quantidade" INTEGER NOT NULL,
    "email_vendedor" TEXT NOT NULL,
    "codigo_venda" INTEGER NOT NULL
);
INSERT INTO "new_ProdutoAVenda" ("codigo_produto", "codigo_venda", "descricao", "email_vendedor", "nome", "quantidade", "valor") SELECT "codigo_produto", "codigo_venda", "descricao", "email_vendedor", "nome", "quantidade", "valor" FROM "ProdutoAVenda";
DROP TABLE "ProdutoAVenda";
ALTER TABLE "new_ProdutoAVenda" RENAME TO "ProdutoAVenda";
CREATE UNIQUE INDEX "ProdutoAVenda_codigo_produto_key" ON "ProdutoAVenda"("codigo_produto");
CREATE TABLE "new_ProdutoVendido" (
    "nome" TEXT NOT NULL,
    "codigo_produto" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" REAL NOT NULL DEFAULT 0.00,
    "quantidade" INTEGER NOT NULL,
    "email_vendedor" TEXT NOT NULL,
    "email_cliente" TEXT NOT NULL,
    "codigo_venda" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "status" TEXT NOT NULL
);
INSERT INTO "new_ProdutoVendido" ("codigo_produto", "codigo_venda", "descricao", "email_cliente", "email_vendedor", "nome", "quantidade", "status", "valor") SELECT "codigo_produto", "codigo_venda", "descricao", "email_cliente", "email_vendedor", "nome", "quantidade", "status", "valor" FROM "ProdutoVendido";
DROP TABLE "ProdutoVendido";
ALTER TABLE "new_ProdutoVendido" RENAME TO "ProdutoVendido";
CREATE UNIQUE INDEX "ProdutoVendido_codigo_venda_key" ON "ProdutoVendido"("codigo_venda");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
