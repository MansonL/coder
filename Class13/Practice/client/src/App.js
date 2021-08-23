import { BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import io from 'socket.io-client';
import Home from './Home';
import Form from './Form'

const socket = io().connect('/');

function App() {
  return (
    <Router>
      <div className="container-fluid d-flex justify-content-center bg-light ">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/chatandsave">
            <Form socket={socket}/>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
