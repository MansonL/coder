
import { Switch, Link, Route, BrowserRouter } from 'react-router-dom';
import { Products } from './Products';
import { Messages } from './Messages';
import { Form } from './Form';
import { Home } from './Home';
import { socket } from '../lib/socket';
import './main.css';
import React, { useEffect, useRef, useState } from 'react';
export function Main () {
  const dropdownMenu = useRef(null);
  const dropdownBtn = useRef(null);
  const [showMenu, setShowMenu] = useState(false)

  useEffect(() => {
    document.addEventListener('click', (ev: MouseEvent) => {
      if(dropdownMenu && dropdownBtn && ev.target){
          if(ev.target != dropdownBtn.current && ev.target != dropdownMenu.current){
            if(showMenu) setShowMenu(false)
          }
        }
    })
  })
  
  /**
   * We are emitting the respective events for requesting to the backend the necessary resources through sockets
   * @param e  
   * 
   */

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => { // Here we are going to need to implement different things due to React <Link> doens't work if there's an existing clickhandler 
    e.preventDefault();
    const whichMenu = e.currentTarget.innerHTML;
    switch(whichMenu){
      case 'Messages': 
          socket.emit('messages');
          socket.emit('users');
          break;
      case 'DB Products':
          socket.emit('products');
          break;
      case 'DB Cart':
          socket.emit('cart');
          break;
      case 'Random Generated':
          socket.emit('randomProducts');
          break;
      }
  }
  
  const menuBtnHandleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      console.log(`Inside click listener`)
      setShowMenu(true)
  }

  const menuClass = `products-dropdown ${showMenu ? 'showMenu' : ''}`;
  return (
    <BrowserRouter>
        <div className="container">
  <div className="top-bar">
    <Link to="/messages">
    <button className="top-buttons">Messages</button>
    </Link>
    <div className="products-menu">
    <button className="top-buttons" id="product-menu-button" ref={dropdownBtn} onClick={menuBtnHandleClick}>Products</button>
      <div className={menuClass} ref={dropdownMenu}>
        <Link to='/randomProducts'>
        <button className='top-buttons' >Random Generated</button>
        </Link>
        <hr className="hr-menu"/>
        <Link to="/form">
        <button className='top-buttons' >Form</button>
        </Link>
        <hr className="hr-menu"/>
        <Link to="/products">
        <button className='top-buttons' >DB Products</button>
      </Link>
      <hr className='hr-menu'/>
      <Link to="/cart">
        <button className='top-buttons' >DB Cart</button>
      </Link>
      </div>
      </div>
  </div><hr/>
  <div className="body">
  
    <Switch>
    <Route exact path="/">
        <Home />
      </Route>
      <Route path="/messages">
        <Messages />
      </Route>
      <Route path="/randomProducts">
        <Products type="random"/>
      </Route>
      <Route path="/products">
        <Products type="normal"/>
      </Route>
      <Route path="/cart">
        <Products type="cart"/>
      </Route>
      <Route path="/form">
        <Form />
      </Route>
      
    </Switch>
    
</div>
</div>
</BrowserRouter>
    )
}