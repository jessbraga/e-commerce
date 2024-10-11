import { DollarSign, ShoppingBag, ShoppingCart, FileBox } from "lucide-react";
import { MenuItem } from './MenuItem';

export default function Menu() {
  return (
    <aside className="w-20 sm:w-60 border-r min-h-screen bg-gray-950">
      <nav className="flex flex-col items-center sm:items-start gap-1 py-7">
        <MenuItem icone={DollarSign} texto="Produtos à venda" url="/" />
        <MenuItem icone={ShoppingBag} texto="Minhas Compras" url="/minhasCompras" />
        <MenuItem icone={ShoppingCart} texto="Meu Carrinho" url="/meuCarrinho" />
        <MenuItem icone={FileBox} texto="Meus Anúncios" url="/meusAnuncios" />
      </nav>
    </aside>
  );
}