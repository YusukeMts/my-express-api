# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a basic Express.js REST API project (`api-lesson`) that provides a simple products management system with a React frontend. The project demonstrates full-stack development with a RESTful API backend and a React client for product management.

### Components
- **Backend API** (`app.js`): Express.js REST API server
- **Frontend Client** (`product-viewer/`): React application for product management UI

## Development Commands

### Backend API Server
```bash
# Start the server (development)
node app.js

# Start with auto-restart on changes (recommended for development)
npx nodemon app.js

# Install dependencies
npm install
```

### Frontend React Application
```bash
# Navigate to frontend directory
cd product-viewer

# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Build for production
npm run build

# Run tests
npm test
```

## API Architecture

### Core Structure
- **Single file architecture**: All API logic is contained in `app.js`
- **In-memory data storage**: Product data is stored in a JavaScript array (not persistent)
- **RESTful design**: Follows REST conventions for HTTP methods and status codes

### Available Endpoints
- `GET /products` - Retrieve all products
- `GET /products/:id` - Retrieve a specific product by ID
- `POST /products` - Create a new product

### Data Model
Products contain the following fields:
- `id` (number) - Auto-generated unique identifier
- `name` (string) - Product name (required)
- `price` (number) - Product price (required)
- `category` (string) - Product category (required)

### Key Dependencies
- **express**: Web framework for Node.js
- **cors**: Cross-Origin Resource Sharing middleware for handling requests from different domains
- **nodemon**: Development dependency for auto-restarting the server on file changes

### Server Configuration
- Default port: 3000
- CORS enabled for all origins (development configuration)
- JSON request body parsing enabled
- Extensive Japanese comments explaining each concept

## Implementation Status

### ✅ Complete Implementation - All Core Features Working

#### Backend API (`app.js`) - ✅ COMPLETE
- Express server setup: Port 3000 with CORS enabled
- Data storage: In-memory array with 4 sample products
- GET /products: Returns all products with proper error handling
- GET /products/:id: Returns specific product by ID with 404 handling
- POST /products: Creates new products with validation and auto-generated IDs
- Comprehensive logging: Japanese console logs for all requests

#### Frontend React App (`product-viewer/src/App.js`) - ✅ COMPLETE
- State management: Uses React hooks (useState, useEffect) for products, loading, error states
- Product form: Complete form with name, price, category inputs and validation
- Product display: Styled product list showing all fetched products
- API integration: Full CRUD integration with backend API
- Error handling: Try-catch blocks with user-friendly error messages

### Current Functionality - FULLY OPERATIONAL
- ✅ **View products**: Display all products in formatted list with styling
- ✅ **Add products**: Complete form submission with validation and immediate UI update
- ✅ **Data persistence**: Products persist in server memory during runtime
- ✅ **Error handling**: Comprehensive error handling for network and validation errors

## Quick Start Guide

### Step 1: Start the Backend API Server
```bash
# In the root directory (/my-express-api)
node app.js
# or with auto-restart
npx nodemon app.js
```
Expected output: `サーバーがポート3000で起動しました`

### Step 2: Start the Frontend React Application
```bash
# Open a new terminal window/tab
cd product-viewer
npm start
```
Expected: Browser opens to `http://localhost:3001` (React dev server will use port 3001 since 3000 is occupied by API)

### Step 3: Verify the Application
1. **API Endpoints Test**: GET `http://localhost:3000/products` - Should return products array
2. **Frontend Functionality Test**: Product form should be visible and functional
3. **Integration Test**: Add a product through the form and verify it appears in the list

## Next.js Implementation Results

### Phase 1 Complete: Next.js SSR + Express API版

**実装概要**: Express APIを活用したNext.js SSR（サーバーサイドレンダリング）アプリケーションを実装。`getServerSideProps`を使用した真のSSRでサーバーサイドでAPIを呼び出してHTMLに初期データを含める方式を実現。

#### 最終ファイル構成（Pages Router）
```
nextjs-product-app/
├── pages/
│   ├── index.tsx                 # ✅ メインページ（getServerSideProps使用）
│   └── _app.tsx                  # ✅ アプリケーションルート
├── components/
│   ├── ProductList.tsx           # ✅ 商品リストコンポーネント
│   └── ProductForm.tsx           # ✅ 商品追加フォームコンポーネント
├── lib/
│   ├── types.ts                  # ✅ TypeScript型定義
│   └── api.ts                    # ✅ API呼び出し関数
└── styles/globals.css            # ✅ Tailwind CSS設定
```

#### 重要な実装修正
1. **App Router → Pages Router への変更**: `getServerSideProps`を使用するため
2. **真のSSR実装**: クライアントサイドフェッチからサーバーサイドフェッチへ

```typescript
// ✅ SSRパターン
export const getServerSideProps: GetServerSideProps = async () => {
  const products = await fetchProducts(); // サーバー側でAPI呼び出し
  return { props: { initialProducts: products } };
};
```

#### 動作確認結果
- Express API サーバー: `http://localhost:3000` ✅
- Next.js SSR サーバー: `http://localhost:3001` ✅
- SSR初期表示: サーバーサイドでExpress APIから商品データを取得 ✅
- 商品追加: フォームから新商品を追加可能 ✅
- SEO対応: 初期データがHTMLに含まれて配信 ✅

### Phase 2 Complete: Next.js API Routes版

**実装概要**: Express APIを完全に不要にしたNext.js単体でのフルスタックアプリケーション。App Router、Server/Client Components、JSONファイル永続化を組み合わせた最新のNext.js開発パターンを実現。

#### 最終ファイル構成（App Router + API Routes）
```
nextjs-api-routes-app/
├── src/
│   ├── app/
│   │   ├── page.tsx               # ✅ メインページ（Server Component）
│   │   ├── layout.tsx             # ✅ レイアウト（RootLayout）
│   │   ├── globals.css            # ✅ Tailwind CSS設定
│   │   │
│   │   ├── api/                   # ✅ API Routes
│   │   │   └── products/
│   │   │       ├── route.ts       # ✅ GET/POST /api/products
│   │   │       └── [id]/route.ts  # ✅ GET /api/products/[id]
│   │   │
│   │   └── components/            # ✅ UIコンポーネント
│   │       ├── ProductList.tsx    # ✅ Server Component
│   │       └── ProductForm.tsx    # ✅ Client Component
│   │
│   └── lib/                       # ✅ 共有ライブラリ
│       ├── types.ts               # ✅ フルスタック型定義
│       ├── data.ts                # ✅ データ操作関数
│       ├── api-client.ts          # ✅ API呼び出し関数
│       └── storage.ts             # ✅ JSON永続化モジュール
│
├── data/products.json             # ✅ JSONファイル永続化
```

#### 技術実装の詳細

**1. API Routes実装**: Express API → Next.js API Routes 完全移植
```typescript
export async function GET() {
  const products = await getAllProducts();
  return NextResponse.json(products, { status: 200 });
}

export async function POST(request: NextRequest) {
  const newProduct: NewProduct = await request.json();
  const createdProduct = await createProduct(newProduct);
  return NextResponse.json(createdProduct, { status: 201 });
}
```

**2. JSON永続化システム**: メモリ内データ → JSONファイル永続化
```typescript
export async function readProducts(): Promise<Product[]> {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data) as Product[];
}

export async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
}
```

**3. Server/Client Components分割**: 戦略的なコンポーネント設計
```typescript
// Server Component - サーバーサイドでデータ直接取得
const HomePage = async () => {
  const initialProducts = await getAllProducts(); // API Routes経由不要
  return (
    <div>
      <ProductForm />        {/* Client Component */}
      <ProductList products={initialProducts} /> {/* Server Component */}
    </div>
  );
};
```

#### Phase 1 vs Phase 2の比較

| 項目 | Phase 1 (SSR) | Phase 2 (API Routes) |
|------|---------------|---------------------|
| **サーバー構成** | Express + Next.js (2つ) | Next.js のみ (1つ) |
| **ポート** | 3000 + 3001 | 3003 のみ |
| **データ永続化** | ❌ メモリ内のみ | ✅ JSONファイル |
| **API実装** | Express app.js | Next.js API Routes |
| **型安全性** | フロントエンドのみ | ✅ フルスタック |
| **デプロイ** | 2つのサービス必要 | 1つのサービスのみ |
| **開発体験** | 2つのサーバー管理 | 統合開発環境 |

#### 動作確認・起動方法

**Phase 2単独起動**:
```bash
cd nextjs-api-routes-app
npm run dev  # → http://localhost:3002
```

**Phase 1,2並行稼働** (比較学習用):
```bash
# Terminal 1: Express API
node app.js                    # → http://localhost:3000

# Terminal 2: Phase 1 (SSR)  
cd nextjs-product-app && npm run dev  # → http://localhost:3001

# Terminal 3: Phase 2 (API Routes)
cd nextjs-api-routes-app && npm run dev  # → http://localhost:3002
```

## 🎓 ビギナー向け講習：実装内容の詳細解説

### 📚 システム全体像の理解

#### Phase 1: Express API + Next.js SSR
```
【ユーザー】
    ↓ http://localhost:3001にアクセス
【Next.js サーバー】← getServerSidePropsでデータ取得
    ↓ http://localhost:3000/productsを呼び出し
【Express API サーバー】
    ↓ 商品データを返す
【商品データ（メモリ内）】
```

**役割分担を身近な例で説明**：
- **Express API**: 商品データを管理する「倉庫番」
- **Next.js**: ユーザーが見る「お店の表示」を作る係
- **SSR**: お店を開く前に、あらかじめ商品を倉庫から持ってきて並べておく仕組み

#### Phase 2: Next.js フルスタック
```
【ユーザー】
    ↓ http://localhost:3003にアクセス
【Next.js フルスタックサーバー】
    ├── Server Components ← 初期データを高速表示
    ├── Client Components ← ユーザーとの対話
    ├── API Routes ← Express APIの完全代替
    └── JSONファイル ← データ永続化
【商品データ（JSON ファイル）】← サーバー再起動でも残る！
```

**Phase 1との大きな違い**：
- **Phase 1**: Express API（別サーバー）+ Next.js（フロントエンド）
- **Phase 2**: Next.js一つで**フロント・バック両方**を担当

**身近な例えで説明**：
- **Phase 1**: レストラン（お客様対応）と別の場所にある厨房（料理作成）
- **Phase 2**: **一つの建物**の中にレストランと厨房が両方ある統合型店舗

### 🔧 重要なファイルの役割解説

#### 1. データの型定義 (`lib/types.ts`)
```typescript
export interface Product {
  id: number;        // 商品番号
  name: string;      // 商品名  
  price: number;     // 価格
  category: string;  // カテゴリ
}
```

**ビギナー解説**：
- `interface` = 「この商品データは、こんな形でなければダメ！」という約束事
- TypeScriptが「あ、この商品データ、価格が数字じゃないよ！」と教えてくれる
- **例**: 商品データは必ず「ID（数字）、名前（文字）、価格（数字）、カテゴリ（文字）」が必要

#### 2. SSRの魔法：`getServerSideProps` (Phase 1)
```typescript
export const getServerSideProps: GetServerSideProps = async () => {
  console.log('🚀 サーバーサイドでAPIを呼び出し中...');
  const products = await fetchProducts();  // サーバーでデータ取得
  console.log(`✅ ${products.length}件の商品を取得しました`);
  
  return {
    props: {
      initialProducts: products,  // ページに商品データを渡す
    },
  };
};
```

**ビギナー詳細解説**：

**普通のWebサイト（CSR）の流れ**：
1. ユーザーがページにアクセス
2. 「ちょっと待ってね〜」（ローディング画面）
3. ブラウザがAPIにデータをもらいに行く
4. データが届いたら表示

**SSRの流れ**：
1. ユーザーがページにアクセス
2. **サーバーが先にAPIからデータを取得**（この時点でデータ準備完了！）
3. **データ入りのHTMLをユーザーに送信**
4. **即座に商品が表示される**

**レストランの例え**：
- **CSR**: レストランに行って席に座ってから、メニューを持ってきてもらう
- **SSR**: レストランに着いたとき、すでにメニューが席に置いてある

#### 3. API Routes実装 (Phase 2)
```typescript
// GET /api/products - 全商品を取得
export async function GET() {
  console.log('🔍 GET /api/products リクエストを受信しました');
  const products = await getAllProducts();  // 店長に「全商品見せて」と依頼
  return NextResponse.json(products, { status: 200 });
}

// POST /api/products - 新商品を作成
export async function POST(request: NextRequest) {
  console.log('➕ POST /api/products リクエストを受信しました');
  const body = await request.json() as NewProduct;  // 注文書を受け取る
  const newProduct = await createProduct(body);     // 店長に「新商品作って」と依頼
  return NextResponse.json(newProduct, { status: 201 });
}
```

**Phase 1 Express APIとの比較**：

| Phase 1 Express API | Phase 2 API Routes |
|---------------------|-------------------|
| `app.get('/products', ...)` | `export async function GET()` |
| `app.post('/products', ...)` | `export async function POST()` |
| 別サーバー（port 3000） | **Next.js内蔵（同じサーバー）** |

**身近な例え**：
- **Phase 1**: 別の建物の厨房に電話で注文
- **Phase 2**: 同じ建物の厨房に直接依頼（早い！）

#### 4. データ永続化 (Phase 2)
```typescript
export async function readProducts(): Promise<Product[]> {
  const data = await fs.readFile(DATA_FILE, 'utf8');
  return JSON.parse(data) as Product[];  // JSONファイルから読み込み
}

export async function writeProducts(products: Product[]): Promise<void> {
  await fs.writeFile(DATA_FILE, JSON.stringify(products, null, 2), 'utf8');
  console.log(`💾 JSONファイルに${products.length}件の商品を保存しました`);
}
```

**Phase 1からの大進化**：
- **Phase 1**: Express APIのメモリ保存 → **サーバー再起動で消失**
- **Phase 2**: JSONファイル保存 → **サーバー再起動でも残る！**

**身近な例え**：
- **Phase 1**: 頭の中で覚えておく（忘れやすい）
- **Phase 2**: ノートに書いて保存（忘れない）

### 🏆 ビギナーが達成した高度な技術

Phase 1 & 2の実装により、以下の**プロレベルの技術**を習得しました：

#### ✅ **1. フルスタック開発**
- 一つのプロジェクトでフロント・バック両方を開発
- 企業の実際の開発スタイル

#### ✅ **2. 最新のNext.js**
- SSR（サーバーサイドレンダリング）
- App Router完全活用
- Server/Client Components適切分離
- API Routes によるサーバーレス関数

#### ✅ **3. 型安全性の確保**
- TypeScriptでフロント・バック統一
- バグを事前に防ぐ品質管理

#### ✅ **4. データ永続化**
- JSONファイルによる永続ストレージ
- 実用的なアプリケーション機能

#### ✅ **5. 本格的なRESTful API**
- Express APIと同等の機能
- HTTP status codes、エラーハンドリング

#### ✅ **6. プロダクション準備**
- Vercel等への単一デプロイ対応
- スケーラブルなアーキテクチャ

### 🎓 次のステップへの道筋

#### **初級 → 中級**
- **データベース統合**: PostgreSQL、Supabase
- **認証システム**: NextAuth.js、Auth0

#### **中級 → 上級**
- **リアルタイム機能**: WebSocket、Server-Sent Events
- **テスト実装**: Jest、Playwright、Cypress

#### **上級 → プロ**
- **マイクロサービス**: 複数サービス連携
- **パフォーマンス最適化**: キャッシュ、CDN

### 💬 ビギナーへの励ましメッセージ

**おめでとうございます！**

今回の実装により、あなたは：

🎯 **単なる学習者から、実践的な開発者へとレベルアップしました**

今回作成したアプリケーションは：
- ✅ 実際の企業で使われているレベル
- ✅ 本格的なフルスタック開発
- ✅ 最新技術を活用した高品質なコード

**この経験は、Web開発者としての強固な基盤となります！**

次はデータベース統合や認証システムなど、さらに実用的な機能にチャレンジして、プロの開発者を目指しましょう！

## Learning Path Progression

This project serves as a foundation for learning full-stack development:

1. **Current Level**: Basic CRUD API with React frontend ✅
2. **Completed**: Next.js implementation patterns (SSR/SSG, API Routes) ✅
3. **Next Steps**: Database integration, authentication
4. **Advanced Topics**: Microservices, real-time features, deployment
5. **Professional Level**: Testing, monitoring, scalability