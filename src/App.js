import React, {Fragment, useState} from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Search from './components/users/Search';
import Users from './components/users/Users';
import User from './components/users/User';
import Alert from './components/layout/Alert';
import About from './components/pages/About';
import GithubState from './context/github/GithubState';
import './App.css';

const App = () => {
const [users, setUsers] = useState([]);
const [repos, setRepos] = useState([]);
const [user, setUser] = useState({});
const [loading, setLoading] = useState(false);
const [alert, setAlert] = useState(null);

//Set Alert
const showAlert = (msg, type) => {
  setAlert({msg: msg, type: type});
  setTimeout(() => setAlert(null), 5000);
}
    return (
      <GithubState>
      <Router>
      <div className='App'>
        <Navbar/>
        <div className="container">
        <Alert alert={alert}/>
        <Switch>
          <Route exact path='/' render={props => (
            <Fragment>
              <Search setAlert={showAlert}/>
              <Users/>
            </Fragment>
          )}/>

          <Route exact path='/about' component={About}/>
          <Route exact path='/user/:login' render={props => (
          <User {...props}/>
          )}/>
        </Switch>
        </div>
      </div>
      </Router>
      </GithubState>
       );
}

export default App;
