import React from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';

function App(): JSX.Element {
  return(
      <Router>
      <div className="container-fluid d-flex align-items-center vh-100">
          <Switch>
              <Route path="/">
               <Home />
              </Route>
              <Route path="/chat">
                  <Layout />
              </Route>
          </Switch>
      </div>
      </Router>
  )
}

export default App;
