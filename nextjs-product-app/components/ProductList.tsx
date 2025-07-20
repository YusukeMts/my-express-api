import { Product } from '../lib/types';

interface ProductListProps {
  products: Product[];
}

export default function ProductList({ products }: ProductListProps) {
  if (products.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        まだ商品が登録されていません。
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow"
        >
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {product.name}
          </h3>
          <p className="text-2xl font-bold text-blue-600 mb-2">
            {product.price.toLocaleString()}円
          </p>
          <p className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full inline-block">
            {product.category}
          </p>
        </div>
      ))}
    </div>
  );
}