import { GetServerSideProps } from 'next';
import { useState } from 'react';
import { Product } from '../lib/types';
import { fetchProducts } from '../lib/api';
import ProductList from '../components/ProductList';
import ProductForm from '../components/ProductForm';

interface HomeProps {
  initialProducts: Product[];
}

const Home = ({ initialProducts }: HomeProps) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleProductAdded = async () => {
    try {
      setLoading(true);
      // 商品追加後、最新データを再取得
      const updatedProducts = await fetchProducts();
      setProducts(updatedProducts);
      setError(null);
    } catch (error) {
      console.error('商品リストの更新中にエラーが発生しました:', error);
      setError('商品リストの更新に失敗しました。');
    } finally {
      setLoading(false);
    }
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
            <h2 className="text-lg font-semibold mb-2">エラーが発生しました</h2>
            <p>{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              ページを再読み込み
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            商品管理システム (SSR版)
          </h1>
          <p className="text-gray-600">
            Next.js getServerSideProps + Express API による商品管理アプリケーション
          </p>
          <p className="text-sm text-blue-600 mt-2">
            ✅ 初期データはサーバーサイドレンダリングで取得されています
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* 商品追加フォーム */}
          <div className="lg:col-span-1">
            <ProductForm onProductAdded={handleProductAdded} />
          </div>

          {/* 商品リスト */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                商品リスト（サーバーサイドレンダリング）
              </h2>
              <p className="text-gray-600">
                登録済み商品一覧（{products.length}件）
                {loading && <span className="text-blue-600 ml-2">更新中...</span>}
              </p>
            </div>
            <ProductList products={products} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

// getServerSideProps: サーバーサイドでデータを取得
export const getServerSideProps: GetServerSideProps<HomeProps> = async () => {
  try {
    console.log('🚀 getServerSideProps: サーバーサイドでAPIを呼び出し中...');
    
    // サーバーサイドでExpress APIを呼び出し
    const products = await fetchProducts();
    
    console.log(`✅ getServerSideProps: ${products.length}件の商品を取得しました`);
    
    return {
      props: {
        initialProducts: products,
      },
    };
  } catch (error) {
    console.error('❌ getServerSideProps: APIエラー:', error);
    
    // エラーの場合は空配列を返す
    return {
      props: {
        initialProducts: [],
      },
    };
  }
};