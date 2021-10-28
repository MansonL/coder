
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { Products } from './Products';
import { Messages } from './Messages';
import { Form } from './Form';
import { Home } from './Home';
import { socket } from '../lib/socket';
import './main.css';
import { useEffect, useRef } from 'react';
export function Main () {
  const dropdownMenu = useRef(null);
  const dropdownBtn = useRef(null);
  /*
  useEffect(() => {
    document.addEventListener('click', (ev: MouseEvent) => {
        dropdownMenu.current
    })
  })
  */
  /**
   * We are emitting the respective events for requesting to the backend the necessary resources through sockets
   * @param e  
   * 
   */

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
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
  
  return (
    <Router>
        <div className="container">
  <div className="top-bar">
    <Link to="/messages">
    <button className="top-buttons">Messages</button>
    </Link>
    <div className="products-menu">
    <button className="top-buttons" id="product-menu-button" ref={dropdownBtn}>Products</button>
      <div className="products-dropdown" ref={dropdownMenu}>
        <Link to='/randomProducts'>
        <button>Random Generated</button>
        </Link>
        <hr className="hr-menu"/>
        <Link to="/form">
        <button onClick={handleClick}>Form</button>
        </Link>
        <hr className="hr-menu"/>
        <Link to="/products">
        <button>DB Products</button>
      </Link>
      <hr className='hr-menu'/>
      <Link to="/cart">
        <button>DB Cart</button>
      </Link>
      </div>
      </div>
  </div><hr/>
  <div className="body">
    <Switch>
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
      <Route path="/">
        <Home />
      </Route>
    </Switch>
</div>
</div>
</Router>
    )
}