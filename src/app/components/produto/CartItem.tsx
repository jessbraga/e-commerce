import { Trash, PlusCircle, MinusCircle, Plus } from 'lucide-react';

interface CartItemProps {
  id: number;
  name: string;
  status: string;
  imgSrc: string;
  price: number;
  selected: boolean;
  quantity: number;
  onToggleSelect: (id: number) => void;
  onRemove: (id: number) => void;
  onUpdateQuantity: (id: number, delta: number) => void;
}

export default function CartItem({
  id,
  name,
  status,
  imgSrc,
  price,
  selected,
  quantity,
  onToggleSelect,
  onRemove,
  onUpdateQuantity,
}: CartItemProps) {
  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between py-3 border-b">
      <div className="flex items-start sm:items-center space-x-4 w-full sm:w-auto">
        <input
          type="checkbox"
          checked={selected}
          onChange={() => onToggleSelect(id)}
        />
        <img src={imgSrc} alt={name} className="w-16 h-16 object-cover rounded" />
        <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full">
          <div>
            <h3 className="text-lg font-semibold">{name}</h3>
            <p className="text-sm font-semibold">Preço: R$ {price}</p>
            <p className="text-sm text-gray-500">Status: {status}</p>
            <div className="flex items-center space-x-2 mt-1">
              <button
                aria-label="Decrease quantity"
                onClick={() => onUpdateQuantity(id, -1)}
              >
                <MinusCircle />
              </button>
              <span>{quantity}</span>
              <button
                aria-label="Increase quantity"
                onClick={() => onUpdateQuantity(id, 1)}
              >
                <PlusCircle />
              </button>
            </div>
          </div>
        </div>
      </div>
      <button
        onClick={() => onRemove(id)}
        className="text-red-600 hover:text-red-800 transition-colors mt-3 sm:mt-0"
        aria-label="Remove item"
      >
        <Trash className="w-5 h-5" />
      </button>
    </div>
  );
}
