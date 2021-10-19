import './main.css';
import { BrowserRouter as Router, Switch, Link, Route } from 'react-router-dom';
import { Products } from './Products';
import { Messages } from './Messages';
import { Form } from './Form';
import { Home } from './Home';


export function Main () {
  return (
    <Router>
        <div className="container">
  <div className="top-bar">
    <Link to="/messages">
    <button className="top-buttons">Messages</button>
    </Link>
    <div className="products-menu">
    <button className="top-buttons" id="product-menu-button">Products</button>
      <div className="products-dropdown">
        <Link to='/randomProducts'>
        <button>Random Generated</button>
        </Link>
        <hr className="hr-menu"/>
        <Link to="/form">
        <button>Form</button>
        </Link>
        <hr className="hr-menu"/>
        <Link to="/products">
        <button>DB Products</button>
      </Link>
      </div>
      </div>
  </div><hr/>
  <div className="body">
    <Switch>
      <Route path="/randomProducts">
        <Products type="random"/>
      </Route>
      <Route path="/messages">
        <Messages />
      </Route>
      <Route path="/products">
        <Products type="normal"/>
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