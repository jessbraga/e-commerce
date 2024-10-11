import { ReactNode, useState } from 'react';
import Image from 'next/image';
import { ShoppingCart, PlusCircle, MinusCircle } from 'lucide-react';
import Notification, { NotificationConfig } from '../shared/Notification';
import ActionButton from '../shared/ActionButton';
import Modal from '../shared/Modal';
import { Product } from '@/core/model/Product';
import { usePush } from '@/app/hooks/push';

export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  toBuy?: boolean;
}

export default function ProductCard({ product, onClick, toBuy } : ProductCardProps) {
  const [detailsModalOpen, setDetailsModalOpen] = useState<boolean>(false)
  const [amountModalOpen, setAmountModalOpen] = useState<boolean>(false)
  const [amount, setAmount] = useState<number>(1)
  const [notification, setNotification] = useState<NotificationConfig>({
    message: "",
    type: "default",
    isVisible: false
  })

  const { loadData: addToCart, isLoading } = usePush("/cart")

  const onHandleDetailsModal = (): void => setDetailsModalOpen(!detailsModalOpen)
  const onHandleAmountModal = (): void => {
    setAmountModalOpen(!amountModalOpen)
    setAmount(1)
  }

  const handleAmount = (operation: "increase" | "decrease" ): void => {
    if (amount === 0 && operation === "decrease") return
    switch (operation) {
      case "increase":
        setAmount(amount + 1)
        break
      case "decrease":
        setAmount(amount - 1)
        break
    }
  } 

  const handleAddToCart = async (): Promise<void> => {
    const userId =  1 // O ID do usuário pode ser obtido de um contexto ou estado global
    const response: any = await addToCart({
      userId: userId,
      productId: product.id,
      quantity: amount
    })
    if (!response?.error) {
      setNotification({
        message: "Produto adicionado ao carrinho",
        type: "success",
        isVisible: true
      })
    } else {
      setNotification({
        message: response.error,
        type: "danger",
        isVisible: true
      })
    }
  };

  const detailsModal: ReactNode = (
    <>
      <Modal
        title="Detalhes do Produto"
        isOpen={detailsModalOpen}
        onClose={onHandleDetailsModal}
        content={
          <>
            <div className="pt-4 flex">
              <Image
                src="https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA"
                width={80}
                height={80}
                className="hidden lg:flex md:w-96 md:h-96 mr-4"
                alt={product.name}
              />
              <div className="max-h-96 w-auto text-pretty overflow-y-auto">
                <div className="flex flex-col mb-2">
                  <h3 className="text-xl font-medium">{product.name}</h3>
                  <p className="text-md text-gray-500">R$ {product.price.toFixed(2)}</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">Código:</span>
                  <p className="text-gray-700">{product.id}</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">Estoque:</span>
                  <p className="text-gray-700">{product.stock} un.</p>
                </div>
                <div className="flex flex-row mb-2 space-x-1">
                  <span className="text-semibold">E-mail do Vendedor:</span>
                  <p className="text-gray-700">{product.userEmail}</p>
                </div>
                <div className="flex flex-col space-y-1">
                  <span>Descrição:</span>
                  <p className="text-gray-700 break-words">{product.description}</p>
                </div>
              </div>
            </div>
          </>
        }
      />
    </>
  )

  const amountModal: ReactNode = (
    <>
      <Modal
        title="Selecione a Quantidade"
        isOpen={amountModalOpen}
        onClose={onHandleAmountModal}
        width=""
        content={
          <>
            <div className="flex flex-col justify-center items-center space-y-5">
              <div className="flex flex-row space-x-4">
                <button onClick={() => handleAmount("decrease")}>
                  <MinusCircle size={30}/>
                </button>
                <span>{amount}</span>
                <button onClick={() => handleAmount("increase")}>
                  <PlusCircle size={30}/>
                </button>
              </div>
              <ActionButton 
                title="Adicionar no Carrinho" 
                extraStyle="flex items-center justify-center w-full"
                onClick={handleAddToCart}
              />
            </div>
          </>
        }
      />
    </>
  )

  return (
    <div
      className="flex flex-col items-center w-full h-35 bg-white shadow-sm border border-gray-300 rounded-md"
      onClick={() => onClick?.(product)}
    >
      <Image
        src="https://fastly.picsum.photos/id/875/150/150.jpg?hmac=BVUVtr50E6SkjYSs14Bo6bSHbG4SzeKtkDkiE6MMnSA"
        width={80}
        height={80}
        className="w-full max-h-60"
        alt="Avatar"
      />
      <div className="flex w-full flex-col gap-2 p-4 mb-2">
        <h5 className="text-lg font-semibold text-center">{product.name}</h5>
        <p className="text-gray-500 text-center">R$ {product.price}</p>
        <div className="flex flex-row gap-2 justify-end">
          <ActionButton 
            title="Detalhes" 
            onClick={onHandleDetailsModal} 
            extraStyle="flex items-center justify-center w-full gap-2"
          />
          {toBuy ?? (
            <button
              className="flex items-center justify-center p-3 rounded-full border border-black hover:bg-black hover:text-white"
              onClick={onHandleAmountModal} 
              disabled={isLoading} 
            >
              <ShoppingCart size={18} />
            </button>
          )}
        </div>
      </div>
      <Notification
        message={notification.message}
        visible={notification.isVisible}
        type={notification.type}
        onClose={() => setNotification({...notification, isVisible: false})}
      />
      {detailsModal}
      {amountModal}
    </div>
  );
}
