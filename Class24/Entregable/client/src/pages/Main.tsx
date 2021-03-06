
import { Routes, Link, Route, Router, BrowserRouter } from 'react-router-dom';
import { Messages } from './Messages';
import { Form } from './Form';
import { Home } from './Home';
import './main.css';
import React, { useEffect, useRef, useState } from 'react';
import { RandomProducts } from './randomProducts';
import { DBProducts } from './DBProducts';
import { Cart } from './Cart';
import { LogIn } from './LogIn';

export function Main () {
  const dropdownMenu = useRef(null);
  const dropdownBtn = useRef(null);
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    document.addEventListener('click', (ev: MouseEvent) => {
      if(dropdownMenu && dropdownBtn && ev.target){
          if(ev.target != dropdownBtn.current && ev.target !== dropdownMenu.current){
            if(showMenu) setShowMenu(false)
          }
        }
    })
  })
  
  
  const menuBtnHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      setShowMenu(true)
  }

  const menuClass = `products-dropdown ${showMenu ? 'showMenu' : ''}`;
  return (
        <BrowserRouter>
        <div className="container">
          
  <div className="top-bar">
  <div className="products-menu"><button className="top-buttons" ref={dropdownBtn} id="product-menu-button" onClick={menuBtnHandleClick}>Products</button>
      <div className={menuClass} ref={dropdownMenu}><Link to="/randomProducts"><button className="top-buttons">Random Generated</button></Link>
        <hr className="hr-menu"/><Link to="/form" ><button className="top-buttons">Form</button></Link>
        <hr className="hr-menu"/><Link to="/DBProducts"><button className="top-buttons">DB Products</button></Link>
        <hr className="hr-menu"/><Link to="/cart"><button className="top-buttons">DB Cart</button></Link>
      </div>
    </div>
    <Link to="/messages"><button className="top-buttons">Messages</button></Link>
    <Link to="/login"><button className="top-buttons">Log in/Log out</button></Link>
  </div><hr/>
  <div className="body">
  
    <Routes>
    <Route path="/" element={<Home/>} />
      <Route path="/messages" element={<Messages/>}/>
      <Route path="/randomProducts" element={<RandomProducts/>} />
      <Route path="/DBProducts" element={<DBProducts/>} />
      <Route path="/cart" element={<Cart/>} />
      <Route path="/form" element={<Form/>} />
      <Route path="/login" element={<LogIn/>}/>
    </Routes>
    
</div>
</div>
</BrowserRouter>
    )
}