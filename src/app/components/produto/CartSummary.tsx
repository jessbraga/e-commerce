import React, { ReactNode, useState } from 'react';
import Notification from '../shared/Notification';
import pixLogo from '@/public/images/pix-icon.png';
import creditCardLogo from '@/public/images/credit-card-logo.png'
import CreditCardForm from '../cart/CreditCardForm';

interface CartSummaryProps {
  total: number
  selectedCount: number
  onToggleSelectAll: () => void
  allSelected: boolean
}

interface PaymentMethods {
  label: string
  value: string | null
  imagePath: string
}

const paymentInitialState: PaymentMethods = {
  label: "Método de pagamento",
  value: null,
  imagePath: ""
}

export default function CartSummary({
  total,
  selectedCount,
  onToggleSelectAll,
  allSelected,
}: CartSummaryProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [selected, setSelected] = useState<PaymentMethods>(paymentInitialState)
  const [notificationVisible, setNotificationVisible] = useState(false)

  const handlePurchase = () => {
    setNotificationVisible(true)

    setTimeout(() => {
      setNotificationVisible(false)
    }, 3000);
  }

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleSelect = (option: string, label: string, image: string) => {
   setSelected({
    label: label,
    value: option,
    imagePath: image
   })
    setIsOpen(false)
  }

  const paymentMethods: ReactNode = (
    <div className="relative inline-block w-full max-w-screen p-4 bg-gray-50 rounded-lg">
      <button 
        onClick={toggleDropdown} 
        className="w-full bg-white border border-black text-black py-3 px-4 rounded-md shadow-sm flex items-center hover:text-white hover:bg-black focus:outline-none transition">
        {selected.imagePath ? <img src={selected.imagePath} alt={selected.label} className="w-6 h-6 mr-3" /> : null}
        <span>{selected.label}</span>
      </button>
      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-md shadow-lg z-10">
          <div 
            onClick={() => handleSelect("creditCard", "Cartão de Crédito", creditCardLogo.src)} 
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
            <img src={creditCardLogo.src} alt="Cartão" className="w-6 h-6 mr-3" />
            <span>Cartão de Crédito</span>
          </div>
          <div 
            onClick={() => handleSelect("pix", "Pix", pixLogo.src)} 
            className="flex items-center px-4 py-2 cursor-pointer hover:bg-gray-100 transition">
            <img src={pixLogo.src} alt="Pix" className="w-6 h-6 mr-3" />
            <span>Pix</span>
          </div>
        </div>
      )}
    </div>
  )

  return (
    <div className="flex flex-col space-y-4">
      {paymentMethods}
      {selected.value === "creditCard" ? <CreditCardForm/> : null}
      <div className="p-4 bg-gray-50 rounded-lg">
        <button
          onClick={onToggleSelectAll}
          className="text-blue-600 hover:text-blue-800 transition-colors mb-2"
        >
          {allSelected ? 'Desmarcar todos' : 'Selecionar todos'}
        </button>
        <div className="flex justify-between text-lg font-semibold">
          <span>Total estimado</span>
          <span>R${total.toFixed(2)}</span>
        </div>
        <button
          className="w-full mt-4 border border-black rounded-md hover:bg-black hover:text-white transition-colors"
          disabled={selectedCount === 0}
          onClick={handlePurchase} 
        >
          Comprar ({selectedCount})
        </button>
        <Notification
          message="Compra efetuada com sucesso"
          visible={notificationVisible}
          onClose={() => setNotificationVisible(false)}
        />
      </div>
    </div>
  );
}
