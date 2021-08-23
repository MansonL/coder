import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import io from 'socket.io-client';
import Home from './components/Home';
import Layout from './components/Layout';

const socket = io().connect('/');

function App() {
  return (
    <Router>
      <div className="container-fluid vh-100">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/chatandsave">
            <Layout socket={socket}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
