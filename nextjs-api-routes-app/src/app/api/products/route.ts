import { NextRequest, NextResponse } from 'next/server';
import { getAllProducts, createProduct } from '@/lib/data';
import { NewProduct } from '@/lib/types';

/**
 * GET /api/products - 全商品を取得
 * Express API の GET /products と同等の機能
 */
export const GET = async () => {
  try {
    console.log('🔍 GET /api/products リクエストを受信しました');
    
    const products = await getAllProducts();
    
    console.log(`✅ ${products.length}件の商品を返却します`);
    return NextResponse.json(products, { status: 200 });
    
  } catch (error) {
    console.error('❌ 商品取得エラー:', error);
    return NextResponse.json(
      { error: '商品の取得に失敗しました' },
      { status: 500 }
    );
  }
};

/**
 * POST /api/products - 新商品を作成
 * Express API の POST /products と同等の機能
 */
export const POST = async (request: NextRequest) => {
  try {
    console.log('➕ POST /api/products リクエストを受信しました');
    
    // リクエストボディをJSONとして取得
    const body = await request.json() as NewProduct;
    console.log('📝 リクエストデータ:', body);
    
    // バリデーション
    if (!body.name || !body.price || !body.category) {
      console.log('❌ 必須フィールドが不足しています');
      return NextResponse.json(
        { error: '商品名、価格、カテゴリは必須です' },
        { status: 400 }
      );
    }

    if (typeof body.price !== 'number' || body.price <= 0) {
      console.log('❌ 価格が無効です');
      return NextResponse.json(
        { error: '価格は0より大きい数値を入力してください' },
        { status: 400 }
      );
    }

    // 新商品を作成
    const newProduct = await createProduct(body);
    
    console.log(`✅ 新商品を作成しました: ${newProduct.name} (ID: ${newProduct.id})`);
    return NextResponse.json(newProduct, { status: 201 });
    
  } catch (error) {
    console.error('❌ 商品作成エラー:', error);
    
    // カスタムエラーメッセージがある場合はそれを使用
    if (error instanceof Error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }
    
    return NextResponse.json(
      { error: '商品の作成に失敗しました' },
      { status: 500 }
    );
  }
};