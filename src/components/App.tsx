import React from 'react';
import '../App.css';
import Layout from './Layout'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from '../context/cartContext'
import { CheckOutProvider } from '../context/checkOutContext'

function App() {
  return (

    <div className="App">

      <BrowserRouter>
        <CartProvider>
          <CheckOutProvider>
            <Layout />
          </CheckOutProvider>
        </CartProvider>
      </BrowserRouter>

    </div>
  );
}

export default App;
