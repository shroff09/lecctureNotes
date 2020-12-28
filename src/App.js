import React from 'react';
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import SignInSide from './components/authentication/Login.jsx'
import SignUpSide from './components/authentication/Register.jsx'
import DashBoard from './components/authentication/DashBoard.jsx'
function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Switch>
            <Route exact path='/' component={SignInSide}></Route>
            <Route path='/register' component={SignUpSide}></Route> 
            <Route path='/dashboard' component={DashBoard}></Route>
          </Switch>
        </div>
      </Router> 
    </div>
  );
}

export default App;
