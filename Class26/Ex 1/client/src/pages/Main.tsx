
import { Routes, Link, Route, Router, BrowserRouter } from 'react-router-dom';
import './main.css';
import { Redirect } from './Redirect';

export function Main () {
  
  return (
        <BrowserRouter>
        <div className="container">
          
  <div className="top-bar">
    <Link to="/redirect"><button className="top-buttons">Log in/Sign up</button></Link>
  </div><hr/>
  <div className="body">
  
    <Routes>
      <Route path="/redirect" element={<Redirect/>}/>
    </Routes>
    
</div>
</div>
</BrowserRouter>
    )
}