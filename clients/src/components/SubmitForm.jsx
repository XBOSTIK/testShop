import React, { useContext, useState } from 'react';
import { Context } from './context/context';

function OrderForm() {
    const [customerName, setCustomerName] = useState('');
    const [customerEmail, setCustomerEmail] = useState('');
    const [customerPhone, setCustomerPhone] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');
    const { cart, selectedShop, setCart, totalAmount} = useContext(Context);
    
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Cart is empty');
      return;
    }

    if (!customerName || !customerEmail || !customerPhone || !customerAddress) {
        alert('Please fill all fields of the form');
        return;
    }



    try {
        const order = {
          products: cart.map((item) => ({
            product: item._id,
            quantity: item.quantity,
            price: item.price
          })),
          shop: selectedShop,
          customerName,
          customerEmail,
          customerPhone,
          customerAddress,
          totalAmount
        };
        
        const response =  await fetch('http://localhost:5000/api/orders', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(order),
        });
  
        if (response.ok) {
            alert('Order created');
            setCustomerName('');
            setCustomerEmail('');
            setCustomerPhone('');
            setCustomerAddress('');
            clearCart();
        } else {
          throw new Error('Failed to create order');
        }
      } catch (error) {
        console.error('Error creating order:', error);
      }
    };

    const clearCart = () => {
        setCart([]);
        localStorage.removeItem('cart');
    };

  return (
    <form onSubmit={handleSubmit} className='form'>
      <label>
        Your name:
        <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
      </label>
      <label>
        Your email:
        <input type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} />
      </label>
      <label>
        Your phone:
        <input type="number" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
      </label>
      <label>
        Your address:
        <input type="text" value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} />
      </label>
      <button type="submit">Create order</button>
    </form>
  );
}

export default OrderForm;
