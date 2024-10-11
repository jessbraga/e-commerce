'use client'

import React, { useState, useEffect } from 'react';
import { Frown } from 'lucide-react';
import InnerPage from '@/app/components/template/InnerPage';
import Title from '@/app/components/template/Title';
import CartItem from '@/app/components/produto/CartItem';
import CartSummary from '@/app/components/produto/CartSummary';
import { useFetch } from '@/app/hooks/fetch';
import { usePush } from '@/app/hooks/push';

interface Item {
  product: {
    id: number
    name: string
    price: number
    description: string
    stock: number
  };
  quantity: number
  selected?: boolean
}

export default function MyCart() {
  const userId = 1; // substituir pelo ID do usuário logado, se houver
  const [cart, setCart] = useState<Item[]>([]);
  const [cartItemsAmount, setCartItemsAmount] = useState<number>(0)
  
  const { data: cartItems, isLoading } = useFetch<Item[]>(`/cart?userId=${userId}`);
  const { loadData } = usePush('/cart')

  useEffect(() => {
    if (cartItems) {
      setCart(cartItems.map(item => ({ ...item, selected: false })));
    }
  }, [cartItems]);

  useEffect(() => {
    let totalCount = 0
    let selectedItems = cart.filter((item) => item.selected)
    selectedItems.forEach((item) => totalCount += item.quantity)
    setCartItemsAmount(totalCount)
  }, [cart])

  const removeItem = (id: number) => {
    loadData({
      userId: userId,
      productId: id,
      operation: "remove"
    })
    setCart(cart.filter((item) => item.product.id !== id));
  };

  const toggleSelectItem = (id: number) => {
    setCart(cart.map((item) =>
      item.product.id === id ? { ...item, selected: !item.selected } : item
    ));
  };

  const toggleSelectAll = () => {
    const allSelected = cart.every((item) => item.selected);
    setCart(cart.map((item) => ({ ...item, selected: !allSelected })));
  };

  const totalSelected = cart
    .filter((item) => item.selected)
    .reduce((total, item) => total + item.product.price * item.quantity, 0);

  const updateQuantity = (id: number, delta: number) => {
    setCart(cart.map((item) =>
      item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
    ));
  };

  if (isLoading) {
    return <p>Carregando...</p>
  }

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Meu carrinho" secondary="" />
      <div className="flex flex-col lg:flex-row w-full rounded-lg lg:space-x-4">
        <section className="lg:w-1/2 h-fit bg-white shadow p-4 rounded-lg overflow-auto">
          {!!!cart.length ? (
            <div className="flex flex-col items-center align-center">
              <span className="text-center text-[1.5rem]">Seu carrinho está vazio</span>
              <Frown size={27}/>
            </div>
          ) : (
            cart.map((item) => (
              <CartItem
                key={item.product.id}
                id={item.product.id}
                name={item.product.name}
                status={item.product.stock > 0 ? 'Disponível' : 'Indisponível'}
                imgSrc={`https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA`} 
                price={item.product.price}
                selected={item.selected || false}
                quantity={item.quantity}
                onToggleSelect={toggleSelectItem}
                onRemove={removeItem}
                onUpdateQuantity={updateQuantity}
              />
            ))
          )}
        </section>
        <section className="lg:w-1/2 h-fit bg-white shadow p-4 rounded-lg mt-4 lg:mt-0">
          <CartSummary
            total={totalSelected} 
            selectedCount={cartItemsAmount}
            onToggleSelectAll={toggleSelectAll}
            allSelected={cart.every((item) => item.selected)}
          />
        </section>
      </div>
    </InnerPage>
  );
}
