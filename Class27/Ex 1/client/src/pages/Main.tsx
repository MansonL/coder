import { UserProvider } from './components/UserProvider'
import { Routes, Link, Route, Router, BrowserRouter } from 'react-router-dom';
import { Home } from './Home'
import './main.css';
import React, { useEffect, useRef, useState } from 'react';
import { LogIn } from './LogIn';
import { SignUp } from './SignUp';


export interface authResponse {
    message: string;
    data: any
}

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
    <UserProvider>
        <BrowserRouter>
        <div className="container">
          
  <div className="top-bar">
    <Link to="/login"><button className="top-buttons">Log in/Log out</button></Link>
  </div><hr/>
  <div className="body">
  
    <Routes>
      
    <Route path="/" element={<Home/>} />
      <Route path="/login" element={<LogIn/>}/>
      <Route path="/signup" element={<SignUp/>}/>
    
    </Routes>
    
</div>
</div>
</BrowserRouter>
</UserProvider>
    )
}