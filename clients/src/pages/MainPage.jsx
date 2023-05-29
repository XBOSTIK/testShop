import React, { useContext, useEffect, useState } from 'react'
import { Context } from '../components/context/context';
import SidebarShops from '../components/SidebarShops';
import Product from '../components/Product';
import './MainPage.scss'

function App() {
const {shopProducts} = useContext(Context);
  return (
    <div className="container main">
      <SidebarShops/>
      <div className="items">
      {shopProducts.map(product => (
        <Product key={product._id} {...product}/> 
        ))}   
      </div>
    </div>
  );
}

export default App;
