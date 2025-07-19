// src/App.js
import React,{useEffect, useState} from 'react';
import './App.css';

function App(){

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

    </div>

  )


}