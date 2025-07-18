//app.js
// 1. Express モジュールを読み込み、使えるようにする
const express = require('express');

// 2. Express アプリケーションのインスタンスを作成
// これがあなたのAPIサーバーの本体になります
const app=express();

// 3. サーバーがリッスンするポート番号を定義
// 今回は3000番ポートを使います。これは自由に決められます。
const PORT = 3000;

// 4. ダミーの商品データ
// 実際には、このデータはデータベース（例: Supabase, PostgreSQL, MySQLなど）から取得します。
// 今回はシンプルな例なので、プログラム内に直接記述します。

const products = [
    { id: 1, name: 'ノートPC', price: 120000, category: 'PC' },
    { id: 2, name: 'ワイヤレスマウス', price: 3500, category: '周辺機器' },
    { id: 3, name: 'メカニカルキーボード', price: 15000, category: '周辺機器' },
    { id: 4, name: 'Webカメラ', price: 7000, category: '周辺機器' }
];


// 5. ミドルウェアの設定
// `app.use()` は、すべてのリクエストに対して特定の処理を実行するためのものです。

// 5-1. JSONボディを解析するためのミドルウェア
// クライアントから送られてくるHTTPリクエストのボディがJSON形式だった場合、
// それをJavaScriptのオブジェクトに変換して `req.body` でアクセスできるようにします。
app.use(express.json());

// 5-2. CORS (Cross-Origin Resource Sharing) の設定
// これを設定しないと、異なるドメイン（例: Reactアプリが動くポート3001からポート3000のAPIへ）からのアクセスがブロックされます。
// 開発中は全て許可する `*` を使うことが多いですが、本番環境では具体的なドメインを指定してセキュリティを強化します。
const cors = require('cors'); // corsモジュールを読み込む
app.use(cors()); // CORSミドルウェアを適用

// --- APIエンドポイントの定義 ---
// ここからが、具体的なAPIの「窓口」を作る部分です。

// 6. GET /products エンドポイント
// HTTP GETリクエストが '/products' というURLにきたときに実行されます。
// 主にデータの「取得」に使われます。

app.get('/products', (req, res) =>{
    console.log('GET /products リクエストを受信しました');// サーバーのコンソールにログを出力
    // レスポンスのHTTPステータスコードを200 (OK) に設定し、
    // JSON形式で `products` データをクライアントに返します
    res.status(200).json(products);
});


// 7. GET /products/:id エンドポイント
// HTTP GETリクエストが '/products/特定のID' というURLにきたときに実行されます。
// 例: /products/1 にアクセスするとIDが1の商品を返す
// URLの `:id` の部分は、可変のパラメータとして扱われます。
app.get('/products/:id', (req,res)=>{
    const productId = parseInt(req.params.id);
    console.log(`GET /products/${productId} リクエストを受信しました`);

    const product = products.find(p=>p.id===productId);

    if(product){
        res.status(200).json(product);
    } else {
        //商品が見つからなかった場合、ステータスコード404 (Not Found) とエラーメッセージを返します。
        res.status(404).json({ message: '商品が見つかりませんでした' });
    }
});

// 8. POST /products エンドポイント
// HTTP POSTリクエストが '/products' というURLにきたときに実行されます。
// 主にデータの「作成（追加）」に使われます。
app.post('/products', (req,res) => {
    const newProduct = req.body;
    console.log('POST /products リクエストを受信しました。新しい商品:', newProduct);
    // 簡単なバリデーション（データが正しい形式かどうかのチェック）
    // 商品名、価格、カテゴリが空でないか確認します。
    if(!newProduct.name || !newProduct.price || !newProduct.category) {
        return res.status(400).json({ message: '商品名、価格、カテゴリは必須です。'} );
    }
    // 新しい商品のIDを生成します。
    // （実際にはデータベースが自動的に採番してくれることが多いです）
    const newId = products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
    newProduct.id = newId;

    products.push(newProduct);

    // ステータスコード201 (Created) と、追加された商品データを返します。
    res.status(201).json(newProduct);
});

// 9. サーバーの起動
// 定義したポート番号でサーバーを起動し、リクエストを待ち受けます。
app.listen(PORT, () => {
    console.log(`APIサーバーが http://localhost:${PORT} で起動しました。`);
    console.log('ブラウザやAPIテストツールで以下のURLにアクセスしてみてください:');
    console.log(`- 全商品リスト: http://localhost:${PORT}/products`);
    console.log(`- IDが1の商品: http://localhost:${PORT}/products/1`);
    console.log(`- 新しい商品の追加 (POSTリクエスト): http://localhost:${PORT}/products`);
});


