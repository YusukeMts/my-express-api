// 商品の型定義
export interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

// 新しい商品作成時の型定義（IDは自動生成されるため除外）
export interface NewProduct {
  name: string;
  price: number;
  category: string;
}

// APIレスポンスの型定義
export interface ApiError {
  message: string;
}