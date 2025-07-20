// src/App.js
import React,{useEffect, useState} from 'react';
import './App.css';

function App(){
  //状態変数を使いAPIから取得した商品を管理
  const [products, setProducts] =useState([]);
  const [loading, setLoading] =useState(true);
  const [error, setError] = useState(null);

  //入力フォームの状態
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState('');

  // コンポーネントが初回マウントされた時にのみAPIからデータを取得する
  useEffect(()=>{
    const fetchProducts = async () => { //APIから時間かかるので非同期
      try {
        //APIエンドポイント
        const response = await fetch('http://localhost:3000/products');
        if (!response.ok){
          throw new Error (`HTTP error! status: ${response.status}`);
        }
        // JSON形式でレスポンスを解析
        const data = await response.json(); // APIからの返事の中身を、JavaScriptで扱いやすい形（JSONという形式）に変換します。
        setProducts(data);
      } catch(error){
        console.error("商品の取得中にエラーが発生しました:", error); // 開発者向けの画面（ブラウザの「検証ツール」など）に、「商品を取りに行く途中でエラーが出たよ」と詳しくメモします。
        setError('商品の読み込みに失敗しました。'); // ユーザーが見る画面には、「商品がうまく表示されませんでした」という優しいエラーメッセージを設定します
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();

  },[]);// ここが空っぽの「[]」だと、「このお仕事は、画面が最初に表示された時に一度だけやってね」という意味になります。

  //新しい商品を追加する関数




  return(
    <div className="App">
      <h1>商品リスト</h1>
      {/*商品追加フォーム*/} 
      <form onSubmit={handleAddProduct} style={{ marginBottom: '20px', border: '1px solid #ccc', padding: '15px', borderRadius: '8px' }}>
        <h2>新しい商品を追加</h2>
        <div>
          <label> 
            商品名:
            <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} required /> 
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            価格:
            <input type="number" value={newPrice} onChange={(e) => setNewPrice(e.target.value)} required />
          </label>
        </div>
        <div style={{ marginTop: '10px' }}>
          <label>
            カテゴリ:
            <input type="text" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} required />
          </label>
        </div>
        <buttom type="submit" style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          商品を追加
        </buttom>


      </form>

      {/* 商品表示リスト */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product)=>(
          <li key={product.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h3>{product.name}</h3>
            <p>価格：{product.price.toLocalString()}円</p>
            <p>カテゴリ：{product.category}</p>

          </li>

        ))}
      
      </ul>

    </div>

  );


}