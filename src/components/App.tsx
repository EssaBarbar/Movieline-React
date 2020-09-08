import React from 'react';
import '../App.css';
import Layout from './Layout'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../context/cartContext'

function App() {
  return (

    <div className="App">

      <BrowserRouter>
        <CartProvider>
          <Layout />
        </CartProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
