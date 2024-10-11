-- CreateTable
CREATE TABLE "ProdutoVendido" (
    "nome" TEXT NOT NULL,
    "codigo_produto" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" FLOAT NOT NULL DEFAULT 0.00,
    "quantidade" INTEGER NOT NULL,
    "email_vendedor" TEXT NOT NULL,
    "email_cliente" TEXT NOT NULL,
    "codigo_venda" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "status" TEXT NOT NULL,
    "imagem" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProdutoAVenda" (
    "nome" TEXT NOT NULL,
    "codigo_produto" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "descricao" TEXT NOT NULL,
    "valor" FLOAT NOT NULL DEFAULT 0.00,
    "quantidade" INTEGER NOT NULL,
    "email_vendedor" TEXT NOT NULL,
    "codigo_venda" INTEGER NOT NULL,
    "imagem" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "ProdutoNoCarrinho" (
    "codigo_carrinho" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT UNIQUE,
    "nome" TEXT NOT NULL,
    "codigo_produto" INTEGER NOT NULL,
    "descricao" TEXT NOT NULL,
    "valor" FLOAT NOT NULL DEFAULT 0.00,
    "quantidade" INTEGER NOT NULL,
    "email_cliente" TEXT NOT NULL,
    "email_vendedor" TEXT NOT NULL,
    "codigo_venda" INTEGER NOT NULL,
    "imagem" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoVendido_codigo_venda_key" ON "ProdutoVendido"("codigo_venda");

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoAVenda_codigo_produto_key" ON "ProdutoAVenda"("codigo_produto");

-- CreateIndex
CREATE UNIQUE INDEX "ProdutoNoCarrinho_codigo_carrinho_key" ON "ProdutoNoCarrinho"("codigo_carrinho");
