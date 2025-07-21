import { Product, NewProduct } from './types';

// Client Componentから呼び出すため、完全なURLを使用
const API_BASE_URL = typeof window !== 'undefined' 
  ? `${window.location.origin}/api`
  : '/api';

/**
 * フロントエンド側から内部API Routesを呼び出す関数群
 * Phase 1のapi.tsと同等の機能をNext.js内部API用に調整
 */

/**
 * 全商品を取得
 */
export async function fetchProducts(): Promise<Product[]> {
  try {
    console.log('🔍 クライアント: 商品一覧を取得中...');
    
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'GET',
      cache: 'no-store', // SSRで最新データを取得
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const products = await response.json() as Product[];
    console.log(`✅ クライアント: ${products.length}件の商品を取得しました`);
    
    return products;
  } catch (error) {
    console.error('❌ クライアント: 商品取得エラー:', error);
    throw new Error('商品の取得に失敗しました');
  }
}

/**
 * IDで商品を取得
 */
export async function fetchProductById(id: number): Promise<Product> {
  try {
    console.log(`🔍 クライアント: ID ${id} の商品を取得中...`);
    
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      method: 'GET',
      cache: 'no-store',
    });

    if (!response.ok) {
      if (response.status === 404) {
        throw new Error(`ID ${id} の商品が見つかりません`);
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const product = await response.json() as Product;
    console.log(`✅ クライアント: 商品を取得しました - ${product.name}`);
    
    return product;
  } catch (error) {
    console.error('❌ クライアント: 商品取得エラー:', error);
    throw error;
  }
}

/**
 * 新商品を作成
 */
export async function createProduct(productData: NewProduct): Promise<Product> {
  try {
    console.log('➕ クライアント: 新商品を作成中...', productData);
    console.log('🌐 API URL:', `${API_BASE_URL}/products`);
    
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });

    console.log('📡 Response status:', response.status);
    console.log('📡 Response ok:', response.ok);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const newProduct = await response.json() as Product;
    console.log(`✅ クライアント: 新商品を作成しました - ${newProduct.name} (ID: ${newProduct.id})`);
    
    return newProduct;
  } catch (error) {
    console.error('❌ クライアント: 商品作成エラー:', error);
    throw error;
  }
}