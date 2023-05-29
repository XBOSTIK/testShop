import React from 'react'
import {NavLink } from 'react-router-dom';
import './Header.scss';

const Header = () => {
  return (
    <header className='header'>
      <div className="container">
        <ul>
          <li><NavLink to="/">shop</NavLink></li>
          <li><NavLink to="/cart">cart</NavLink></li>
        </ul>
      </div>
    </header>
  )
}

export default Header