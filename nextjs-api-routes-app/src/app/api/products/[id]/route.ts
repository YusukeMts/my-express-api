import { NextRequest, NextResponse } from 'next/server';
import { getProductById } from '@/lib/data';

/**
 * GET /api/products/[id] - IDで商品を取得
 * Express API の GET /products/:id と同等の機能
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    // Next.js 15では params は Promise
    const resolvedParams = await params;
    console.log(`🔍 GET /api/products/${resolvedParams.id} リクエストを受信しました`);
    
    // URLパラメータを数値に変換
    const productId = parseInt(resolvedParams.id, 10);
    
    // IDの妥当性チェック
    if (isNaN(productId) || productId <= 0) {
      console.log(`❌ 無効なID: ${resolvedParams.id}`);
      return NextResponse.json(
        { error: '有効な商品IDを指定してください' },
        { status: 400 }
      );
    }
    
    // 商品を取得
    const product = await getProductById(productId);
    
    if (!product) {
      console.log(`❌ 商品が見つかりません: ID ${productId}`);
      return NextResponse.json(
        { error: `ID ${productId} の商品が見つかりません` },
        { status: 404 }
      );
    }
    
    console.log(`✅ 商品を返却します: ${product.name}`);
    return NextResponse.json(product, { status: 200 });
    
  } catch (error) {
    console.error('❌ 商品取得エラー:', error);
    return NextResponse.json(
      { error: '商品の取得に失敗しました' },
      { status: 500 }
    );
  }
}