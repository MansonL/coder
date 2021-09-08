import Home from './components/Home';
import React from 'react';
import Layout from './components/Layout';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App(): JSX.Element {
    return (
        <Router>
            <div className="container-fluid d-flex align-items-center vh-100 bg-dark">
                <div className="container mx-auto my-auto bg-secondary" id="card">
                    <Switch>
                        <Route path="/" exact>
                            <Home />
                        </Route>
                        <Route path="/chat">
                            <Layout />
                        </Route>
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

export default App;
