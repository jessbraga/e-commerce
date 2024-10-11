import { useState } from 'react';

interface CreditCardFields {
  cardNumber: string
  cardHolder: string
  expiryDate: string
  cvv: string
}

const CreditCardForm = () => {
  const [formData, setFormData] = useState<CreditCardFields>({
    cardNumber: '',
    cardHolder: '',
    expiryDate: '',
    cvv: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aqui você pode enviar os dados do formulário para o backend ou fazer outra ação
    console.log('Dados do Cartão: ', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="bg-gray-50 p-4 w-full max-w-screen mx-auto rounded-lg shadow-sm">
      <div className="mb-4">
        <label htmlFor="cardNumber" className="block text-sm font-medium text-gray-700">
          Número do Cartão:
        </label>
        <input
          type="text"
          id="cardNumber"
          name="cardNumber"
          value={formData.cardNumber}
          onChange={handleChange}
          placeholder="0000 0000 0000 0000"
          required
          className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cardHolder" className="block text-sm font-medium text-gray-700">
          Nome no Cartão:
        </label>
        <input
          type="text"
          id="cardHolder"
          name="cardHolder"
          value={formData.cardHolder}
          onChange={handleChange}
          placeholder="Nome do Titular"
          required
          className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="expiryDate" className="block text-sm font-medium text-gray-700">
          Data de Validade:
        </label>
        <input
          type="text"
          id="expiryDate"
          name="expiryDate"
          value={formData.expiryDate}
          onChange={handleChange}
          placeholder="MM/AA"
          required
          className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
          CVV:
        </label>
        <input
          type="text"
          id="cvv"
          name="cvv"
          value={formData.cvv}
          onChange={handleChange}
          placeholder="123"
          required
          className="mt-1 block w-full px-3 py-2 border border-black rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>
    </form>
  );
};

export default CreditCardForm;