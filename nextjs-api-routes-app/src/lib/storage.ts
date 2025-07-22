import { promises as fs } from 'fs';
import path from 'path';
import { Product } from './types';

// データファイルのパス
const DATA_FILE = path.join(process.cwd(), 'data', 'products.json');

// 初期データ（Express APIから移植）
const INITIAL_DATA: Product[] = [
  { id: 1, name: 'ノートPC', price: 80000, category: 'コンピュータ' },
  { id: 2, name: 'ワイヤレスマウス', price: 3000, category: 'アクセサリ' },
  { id: 3, name: 'メカニカルキーボード', price: 12000, category: 'アクセサリ' },
  { id: 4, name: 'Webカメラ', price: 8000, category: 'アクセサリ' }
];

/**
 * データディレクトリとファイルの初期化
 */
const ensureDataFile = async (): Promise<void> => {
  try {
    // データディレクトリの作成
    const dataDir = path.dirname(DATA_FILE);
    await fs.mkdir(dataDir, { recursive: true });

    // ファイルの存在確認
    await fs.access(DATA_FILE);
  } catch {
    // ファイルが存在しない場合、初期データで作成
    console.log('📁 初期データファイルを作成します...');
    await fs.writeFile(DATA_FILE, JSON.stringify(INITIAL_DATA, null, 2), 'utf8');
    console.log('✅ 初期データファイルが作成されました');
  }
};

/**
 * JSONファイルから商品データを読み込み
 */
export const readProducts = async (): Promise<Product[]> => {
  try {
    await ensureDataFile();
    const data = await fs.readFile(DATA_FILE, 'utf8');
    const products = JSON.parse(data) as Product[];
    console.log(`📖 JSONファイルから${products.length}件の商品を読み込みました`);
    return products;
  } catch (error) {
    console.error('❌ 商品データの読み込みエラー:', error);
    return INITIAL_DATA;
  }
};

/**
 * JSONファイルに商品データを書き込み
 */
export const writeProducts = async (products: Product[]): Promise<void> => {
  try {
    await ensureDataFile();
    await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
    console.log(`💾 JSONファイルに${products.length}件の商品を保存しました`);
  } catch (error) {
    console.error('❌ 商品データの保存エラー:', error);
    throw new Error('商品データの保存に失敗しました');
  }
};

/**
 * 次のIDを生成
 */
export const generateNextId = (products: Product[]): number => {
  if (products.length === 0) return 1;
  return Math.max(...products.map(p => p.id)) + 1;
};