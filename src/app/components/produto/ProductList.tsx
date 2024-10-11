import ProductCard from './ProductCard'
import { Product } from '@/core/model/Product'

export interface ProductListProps {
  products: Product[]
  itemsToBuy?: boolean
}

export default function ProductList({ products, itemsToBuy } : ProductListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product: Product) => {
        return <ProductCard key={product.id} product={product} toBuy={itemsToBuy} />
      })}
    </div>
  )
}