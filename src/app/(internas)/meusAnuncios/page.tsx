'use client'

import { useState } from 'react';
import { PackagePlus } from 'lucide-react';
import FormularioProduto from '@/app/components/produto/FormularioProduto'
import ProductList from '@/app/components/produto/ProductList'
import InnerPage from '@/app/components/template/InnerPage'
import Title from '@/app/components/template/Title'
import Modal from '@/app/components/shared/Modal';
import { useFetch } from '@/app/hooks/fetch';

export default function Page() {
  const [modalOpen, setModalOpen] = useState<boolean>(false)

  const {
    data,
    isLoading,
  } = useFetch<Record<string, any>>("/products?fromUser=1", {
    revalidateOnFocus: true
  }) // IMPORTANTE: o ID do usuário está fixo, pois não há sistema de login ainda 

  const onHandleModal = () : void => setModalOpen(!modalOpen)

  return (
    <InnerPage className="flex flex-col gap-10">
      <Title main="Meus Anúncios"/>
      {isLoading ? null : (
        <>
          <div className="flex justify-end">
            <button
              className="flex items-center gap-2 px-4 py-2 border border-black rounded-md hover:bg-black hover:text-white" 
              onClick={onHandleModal}
            >
              <PackagePlus/>
              Cadastrar Produto
            </button>
          </div>
          <ProductList products={data?.products} itemsToBuy={false}/>
          <Modal
            title="Novo Produto"
            isOpen={modalOpen}
            onClose={onHandleModal}
            content={<FormularioProduto/>}
          />
        </>
      )}
    </InnerPage>
  )
}