import { getAllProducts } from '@/lib/data';
import ProductList from './components/ProductList';
import ProductForm from './components/ProductForm';

/**
 * メインページ - Server Component
 * サーバーサイドで商品データを取得し、初期表示を高速化
 */
export default async function ProductsPage() {
  console.log('🏠 メインページをサーバーサイドでレンダリング中...');
  
  // サーバーサイドで直接データ層にアクセス（API Routes を経由しない）
  const initialProducts = await getAllProducts();
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* ヘッダー */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            商品管理システム
          </h1>
          <p className="text-lg text-gray-600">
            Next.js API Routes版 - フルスタックアプリケーション
          </p>
          <div className="mt-4 text-sm text-blue-600 bg-blue-50 inline-block px-4 py-2 rounded-lg">
            🚀 Phase 2: API Routes + Server Components + JSONファイル永続化
          </div>
        </div>

        {/* 商品追加フォーム（Client Component） */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            新商品の追加
          </h2>
          <ProductForm />
        </div>

        {/* 商品一覧（Server Component） */}
        <div>
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            商品一覧 ({initialProducts.length}件)
          </h2>
          <ProductList products={initialProducts} />
        </div>

        {/* フッター */}
        <div className="mt-16 text-center text-gray-500 text-sm">
          <p>
            Express API不要 | データ永続化 | Server + Client Components
          </p>
        </div>
      </div>
    </div>
  );
}
