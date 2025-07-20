import { Product, NewProduct } from './types';

const API_BASE_URL = 'http://localhost:3000';

// 全商品を取得する関数
export async function fetchProducts(): Promise<Product[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      cache: 'no-store', // SSRで常に最新データを取得
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('商品の取得中にエラーが発生しました:', error);
    throw error;
  }
}

// IDで特定の商品を取得する関数
export async function fetchProductById(id: number): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products/${id}`, {
      cache: 'no-store',
    });
    
    if (!response.ok) {
      if (response.status === 404) {
        throw new Error('商品が見つかりませんでした');
      }
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error(`商品ID ${id} の取得中にエラーが発生しました:`, error);
    throw error;
  }
}

// 新しい商品を作成する関数（クライアントサイドで使用）
export async function createProduct(newProduct: NewProduct): Promise<Product> {
  try {
    const response = await fetch(`${API_BASE_URL}/products`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newProduct),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return response.json();
  } catch (error) {
    console.error('商品の作成中にエラーが発生しました:', error);
    throw error;
  }
}