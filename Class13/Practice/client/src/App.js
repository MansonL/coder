import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import Home from './components/Home';
import Layout from './components/Layout';
import React from 'react';



function App() {
  return (
    <Router>
      <div className="container-fluid d-flex align-items-center vh-100">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/chatandsave">
            <Layout/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
