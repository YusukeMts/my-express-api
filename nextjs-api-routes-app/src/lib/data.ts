import { Product, NewProduct } from './types';
import { readProducts, writeProducts, generateNextId } from './storage';

/**
 * 全商品を取得
 */
export async function getAllProducts(): Promise<Product[]> {
  console.log('🔍 全商品を取得中...');
  return await readProducts();
}

/**
 * IDで商品を取得
 */
export async function getProductById(id: number): Promise<Product | null> {
  console.log(`🔍 ID ${id} の商品を検索中...`);
  const products = await readProducts();
  const product = products.find(p => p.id === id) || null;
  
  if (product) {
    console.log(`✅ 商品を発見: ${product.name}`);
  } else {
    console.log(`❌ ID ${id} の商品が見つかりません`);
  }
  
  return product;
}

/**
 * 新しい商品を作成
 */
export async function createProduct(newProductData: NewProduct): Promise<Product> {
  console.log('➕ 新商品を作成中...', newProductData);
  
  // バリデーション
  if (!newProductData.name || !newProductData.price || !newProductData.category) {
    throw new Error('商品名、価格、カテゴリは必須です');
  }
  
  if (newProductData.price <= 0) {
    throw new Error('価格は0より大きい値を入力してください');
  }

  const products = await readProducts();
  const newId = generateNextId(products);
  
  const newProduct: Product = {
    id: newId,
    name: newProductData.name,
    price: newProductData.price,
    category: newProductData.category
  };

  const updatedProducts = [...products, newProduct];
  await writeProducts(updatedProducts);
  
  console.log(`✅ 新商品を作成しました: ${newProduct.name} (ID: ${newProduct.id})`);
  return newProduct;
}