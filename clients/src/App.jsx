import React, { useEffect, useState } from 'react'
import { Context } from './components/context/context';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.scss';
import Header from './components/Header';
import Cart from './pages/Cart';
import MainPage from './pages/MainPage';


function App() {
  const [shops, setShops] = useState([]);
  const [shopProducts, setShopProducts] = useState([]);
  const [selectedShop, setSelectedShop] = useState('6471e691e9b07a73fa764272');
  const [cart, setCart] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);

  const handleShopSected =  (shopId) => {
    setSelectedShop(shopId)
  }

  const handleTotalAmount = (amount) => {
    setTotalAmount(amount)
  }


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/shops');
        const data = await response.json();
        setShops(data.shops);
        const productResponse = await fetch(`http://localhost:5000/api/shops/${selectedShop}/products`);
        const productData = await productResponse.json();
        setShopProducts(productData.products);
      } catch (error) {
        console.error('error:', error);
      }
    };
  
    fetchData();
  }, [selectedShop]);

  const addToCart = async (_id, name, price, imageUrl) => {
    const prevCart = localStorage.getItem('cart');
    const prevCartItems = prevCart ? JSON.parse(prevCart) : [];
  
    const updatedCart = [...prevCartItems];
  
    const hasProductsFromOtherShops = updatedCart.some((item) => item.shopId !== selectedShop);
  
    if (hasProductsFromOtherShops) {
      alert('Please clear your cart before choose another store');
      return;
    }
  
    const existingProductIndex = updatedCart.findIndex((item) => item._id === _id);
  
    if (existingProductIndex !== -1) {
      updatedCart[existingProductIndex].quantity += 1;
    } else {
      updatedCart.push({ _id, quantity: 1, shopId: selectedShop, name, price, imageUrl });
    }
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setCart(updatedCart);
  };

  useEffect(() => {
    const prevCart = localStorage.getItem('cart');
    const prevCartItems = prevCart ? JSON.parse(prevCart) : [];
  
    const hasProductsFromOtherShops = prevCartItems.some(item => item.shopId !== selectedShop);
  
    if (hasProductsFromOtherShops) {
      alert('Please clear your cart before adding items from another store');
      localStorage.removeItem('cart');
      setCart([]);
      return;
    }
    setCart(prevCartItems);
  }, [selectedShop]);

  const increaseQuantity = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item._id === itemId) {
        const updatedItem = {
          ...item,
          quantity: item.quantity + 1
        };
        updateLocalStorageItem(updatedItem); // Оновлення локального сховища
        return updatedItem;
      }
      return item;
    });
    setCart(updatedCart);
  };
  
  const decreaseQuantity = (itemId) => {
    const updatedCart = cart.map(item => {
      if (item._id === itemId) {
        const updatedItem = {
          ...item,
          quantity: item.quantity - 1
        };
        updateLocalStorageItem(updatedItem);
        return updatedItem;
      }
      return item;
    });
  
    const filteredCart = updatedCart.filter(item => item.quantity > 0);
  
    localStorage.setItem('cart', JSON.stringify(filteredCart));
    setCart(filteredCart);
  };
  
  const updateLocalStorageItem = (item) => {
    const prevCart = localStorage.getItem('cart');
    const prevCartItems = prevCart ? JSON.parse(prevCart) : [];
  
    const updatedCart = prevCartItems.map(cartItem => {
      if (cartItem._id === item._id) {
        return item;
      }
      return cartItem;
    });
  
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  function calculateTotalAmount(cart) {
    return cart.reduce((total, product) => {
      const productPrice = product.price;
      const productQuantity = product.quantity;
      const productTotal = productPrice * productQuantity;
      const totals = total + productTotal;
      handleTotalAmount(totals)
      return totals;
    }, 0);
  }
  return (

    <Context.Provider value={{shops, setShops, shopProducts, setShopProducts, selectedShop, setSelectedShop,handleShopSected, addToCart, cart, increaseQuantity, decreaseQuantity, setCart, totalAmount, handleTotalAmount, calculateTotalAmount}}>
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route exact path="/cart" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </div>
  </Context.Provider>
  );
}

export default App;
