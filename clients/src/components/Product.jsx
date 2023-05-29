import React, { useContext } from 'react'
import { Context } from '../components/context/context';
import './Product.scss'
const Product = (props) => {
  const {addToCart} = useContext(Context);
  const {_id, name, price, imageUrl} = props;
  return (
    <article key={_id} className='card-product'>
        <img src={imageUrl} alt={name} />
        <h4>{name}</h4>
        <p>Цена: {price} UAH</p>
        <button onClick={()=> addToCart(_id, name, price, imageUrl)}>Добавить</button>
    </article>
  )
}

export default Product