import { Product } from '@/lib/types';

interface ProductListProps {
  products: Product[];
}

/**
 * 商品リストコンポーネント - Server Component
 * Phase 1から移植＋Server Component向けに最適化
 */
const ProductList = ({ products }: ProductListProps) => {
  console.log(`📋 ProductList: ${products.length}件の商品を表示中`);

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📦</div>
        <h3 className="text-xl font-semibold text-gray-600 mb-2">
          商品がありません
        </h3>
        <p className="text-gray-500">
          上のフォームから新しい商品を追加してください
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <div
          key={product.id}
          className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6 border border-gray-100"
        >
          {/* 商品ID */}
          <div className="flex justify-between items-start mb-3">
            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
              ID: {product.id}
            </span>
          </div>

          {/* 商品名 */}
          <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2">
            {product.name}
          </h3>

          {/* 価格 */}
          <div className="text-2xl font-bold text-blue-600 mb-3">
            ¥{product.price.toLocaleString()}
          </div>

          {/* カテゴリ */}
          <div className="flex justify-between items-center">
            <span className="text-sm bg-blue-50 text-blue-700 px-3 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          {/* フッター */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs text-gray-500 text-center">
              Server Component で表示
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;