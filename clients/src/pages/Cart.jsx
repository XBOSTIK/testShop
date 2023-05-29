import React, { useContext } from 'react'
import { Context } from '../components/context/context';
import CartItem from '../components/СartItem';
import './Cart.scss'
import SubmitForm from '../components/SubmitForm';
const Cart = () => {
  const {cart, calculateTotalAmount} = useContext(Context);


  return (
    <div className='container'>
      <h1 className='title'>Your cart:</h1>
      <div className="carInner">
        <SubmitForm />
        <CartItem/>
      </div>
      <div className="fullPrice">
        <h4>Total to pay: {calculateTotalAmount(cart)} UAH</h4>
      </div>
    </div>

  )
}

export default Cart