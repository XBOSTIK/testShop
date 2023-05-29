import React, { useContext } from 'react'
import './SidebarShops.scss'
import { Context } from '../components/context/context';

const SidebarShops = () => {
    const {shops, handleShopSected, selectedShop} = useContext(Context);
  return (
    <div className="sidebarShops">
        <h2>Shops:</h2>
        {
        shops.map((shop) =>{
            return (
                <ul key={shop._id}>
                    <li 
                    onClick={() => handleShopSected(shop._id)} 
                    className={selectedShop === shop._id ? 'selected' : ''}>
                        {shop.name}
                    </li>
                </ul>
            )
        })
        }
    </div>
  )
}

export default SidebarShops