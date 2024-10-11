'use client'

import React, { useState, useEffect } from 'react';
import InnerPage from '@/app/components/template/InnerPage';
import Title from '@/app/components/template/Title';
import ProductBuy from '@/app/components/produto/ProductBuy';
import { useFetch } from '@/app/hooks/fetch';

export default function Page() {
  const userId = 1; // Substituir pelo ID do usuário logado, se houver
  const { data: cartItems, isLoading } = useFetch(`/cart?userId=${userId}`);
  const [produtos, setProdutos] = useState([]);

  useEffect(() => {
    if (cartItems) {
      setProdutos(cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        status: item.product.stock > 0 ? 'disponível' : 'indisponível',
        imgSrc: 'https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA', // Substitua com a URL real, se disponível
        price: item.product.price,
        quantity: item.quantity,
      })));
    }
  }, [cartItems]);

  if (isLoading) {
    return <p>Carregando...</p>;
  }

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Minhas compras" secondary="" />
      <ProductBuy products={produtos} />
    </InnerPage>
  );
}
