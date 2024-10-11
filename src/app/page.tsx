'use client'

import ProductList from './components/produto/ProductList'
import InnerPage from './components/template/InnerPage'
import Title from './components/template/Title'
import { useFetch } from './hooks/fetch'

export default function Home() {
  const { 
    data,
    isLoading
  } = useFetch<Record<string, any>>("/products");

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Produtos" secondary="Seja bem-vindo(a)!" />
      {isLoading ? null : <ProductList products={data?.products}/>}
    </InnerPage>
  );
}
