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
  const handleAddProduct =async(e)=>{ //商品を新しく追加するボタン」が押されたときに動くお仕事の関数を作ります。
    e.preventDefault();

    const newProduct={
      name: newName,
      price: parseFloat(newPrice),
      category: newCategory,
    };

    try {// ここでも、APIにデータを送るお仕事なので、問題が起きるかもしれない「お試し期間」として囲みます。
      const response = await fetch('http://localhost:3000/products', {
        method: 'POST',// お願いの種類は、「POST」（新しいデータを作成する）です。
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),// 作った新しい商品情報を、JSON形式の文字列に変換して、お願いの中身として送ります。
      });
      
      if (!response.ok){
        throw new Error (`HTTP error! status: ${response.status}`);
      }

      const addedProduct = await response.json();// APIが「無事に追加したよ、これが追加された商品の情報だよ」と返してきたら、それをJavaScriptで扱える形に変換します。
      setProducts((prevProducts) => [...prevProducts, addedProduct]); // 今表示されている商品リストに、新しく追加された商品も加えて、画面を更新します。)

      //フォームをクリア
      setNewName(''); // 商品名の入力欄を空っぽに戻します。
      setNewPrice(''); // 価格の入力欄を空っぽに戻します。
      setNewCategory(''); // カテゴリの入力欄を空っぽに戻します。

      alert('商品が追加されました！');
    } catch (error){
      console.error("商品の追加中にエラーが発生しました:", error); // 開発者向けの画面に、「商品を追加する途中でエラーが出たよ」と詳しくメモします。
      setError('商品の追加に失敗しました。'); // ユーザーが見る画面に「商品が追加できませんでした」という優しいエラーメッセージを設定します。
    }
  };

  if(loading){
    return <div className="App">商品を読み込み中...</div>;
  }
  if(error){
    return <div className="App" style={{ color: 'red' }}>エラー: {error}</div>; 
  }

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
        <button type="submit" style={{ marginTop: '15px', padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
          商品を追加
        </button>


      </form>

      {/* 商品表示リスト */}
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {products.map((product)=>(
          <li key={product.id} style={{ border: '1px solid #eee', padding: '10px', marginBottom: '10px', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h3>{product.name}</h3>
            <p>価格：{product.price.toLocaleString()}円</p>
            <p>カテゴリ：{product.category}</p>

          </li>

        ))}
      
      </ul>

    </div>

  );


}

export default App;