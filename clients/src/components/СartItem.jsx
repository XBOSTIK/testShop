import React, { useContext } from 'react'
import { Context } from '../components/context/context';
import './CartItem.scss'

const CartItem = () => {
    const { cart, increaseQuantity, decreaseQuantity } = useContext(Context);

    const handleIncreaseQuantity = (itemId) => {
        increaseQuantity(itemId);
    };

    const handleDecreaseQuantity = (itemId) => {
        decreaseQuantity(itemId);
    };
    return (
    <div className='cartItems'>
        {cart.map(item => {
        return (
            <div key={item._id} className='card'>
                <div className="card-image">
                    <img src={item.imageUrl} alt={item.name} />
                </div>
                <div className="rigth">
                    <h4>{item.name}</h4>
                    <p>{item.price} грн</p>
                   
                    <div className="quantity">
                        <button onClick={() => handleIncreaseQuantity(item._id)}>+</button>
                        <p>{item.quantity}</p>
                        <button onClick={() => handleDecreaseQuantity(item._id)}>-</button>
                    </div>
                </div>
            </div>
        )
        })}
    </div>

    )
}

export default CartItem