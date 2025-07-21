'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createProduct } from '@/lib/api-client';
import { NewProduct } from '@/lib/types';

/**
 * 商品追加フォームコンポーネント - Client Component
 * Phase 1から移植＋App Router向けに最適化
 */
const ProductForm = () => {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // フォーム状態
  const [formData, setFormData] = useState<NewProduct>({
    name: '',
    price: 0,
    category: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      console.log('📝 フォーム送信開始:', formData);

      // バリデーション
      if (!formData.name.trim()) {
        throw new Error('商品名を入力してください');
      }
      if (formData.price <= 0) {
        throw new Error('価格は0より大きい値を入力してください');
      }
      if (!formData.category.trim()) {
        throw new Error('カテゴリを入力してください');
      }

      // API呼び出し
      const newProduct = await createProduct(formData);

      // 成功時の処理
      setSuccess(`商品「${newProduct.name}」を追加しました！ (ID: ${newProduct.id})`);
      
      // フォームリセット
      setFormData({
        name: '',
        price: 0,
        category: ''
      });

      // ページをリフレッシュして最新データを表示
      setTimeout(() => {
        router.refresh();
        setSuccess(null);
      }, 2000);

    } catch (error) {
      console.error('❌ フォーム送信エラー:', error);
      setError(error instanceof Error ? error.message : '商品の追加に失敗しました');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (field: keyof NewProduct, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // エラーメッセージをクリア
    if (error) setError(null);
    if (success) setSuccess(null);
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* 商品名 */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
            商品名 *
          </label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={(e) => handleInputChange('name', e.target.value)}
            placeholder="例: ワイヤレスマウス"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isSubmitting}
          />
        </div>

        {/* 価格 */}
        <div>
          <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-2">
            価格 (円) *
          </label>
          <input
            type="number"
            id="price"
            value={formData.price || ''}
            onChange={(e) => handleInputChange('price', parseInt(e.target.value) || 0)}
            placeholder="例: 3000"
            min="1"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isSubmitting}
          />
        </div>

        {/* カテゴリ */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            カテゴリ *
          </label>
          <input
            type="text"
            id="category"
            value={formData.category}
            onChange={(e) => handleInputChange('category', e.target.value)}
            placeholder="例: アクセサリ"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
            disabled={isSubmitting}
          />
        </div>

        {/* エラーメッセージ */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            ❌ {error}
          </div>
        )}

        {/* 成功メッセージ */}
        {success && (
          <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg">
            ✅ {success}
          </div>
        )}

        {/* 送信ボタン */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full py-3 px-6 rounded-lg font-medium transition-all duration-200 ${
            isSubmitting
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-200'
          } text-white`}
        >
          {isSubmitting ? (
            <span className="flex items-center justify-center">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              追加中...
            </span>
          ) : (
            '商品を追加'
          )}
        </button>

        {/* Client Component表示 */}
        <div className="text-xs text-gray-500 text-center pt-4 border-t border-gray-100">
          Client Component (フォーム操作・状態管理)
        </div>
      </form>
    </div>
  );
};

export default ProductForm;