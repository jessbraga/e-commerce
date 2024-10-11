import React from 'react';

interface Product {
  id: number;
  name: string;
  imgSrc: string;
  price: number;
  quantity: number;
}

interface ProductBuyProps {
  products: Product[];
}

export default function ProductBuy({ products }: ProductBuyProps) {
  return (
    <div className="w-full bg-white shadow p-4 rounded-lg mb-4">
      {products.length ? (
        products.map((product) => (
          <div key={product.id} className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center space-x-4 flex-grow">
              <img src={product.imgSrc} alt={product.name} className="w-16 h-16 object-cover rounded" />
              <div className="flex flex-col">
                <h3 className="text-lg font-semibold">{product.name}</h3>
                <p className="text-gray-500">Quantidade: {product.quantity}</p>
              </div>
            </div>
            <p className="text-gray-500 ml-4">R$ {product.price.toFixed(2)}</p>
          </div>
        ))
      ) : (
        <p className="text-gray-500">Nenhum produto encontrado.</p>
      )}
    </div>
  );
}
