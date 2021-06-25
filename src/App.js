import './App.css';
import {Navbar} from './Components/Layout/Navbar';
import {Home} from './Pages/Home';


import { HashRouter as Router, Route, Switch} from "react-router-dom";
import { Contacts } from './Pages/Contacts';
import { User } from './Components/Layout/User';
import { Followers } from './Components/Layout/Followers';
import { UserRepos } from './Components/Layout/Repos';
import {GithubState} from './context/github/GithubState';



export const App = () => {

  return (
    /**! DON'T FORGET TO INSTALL ALL DEPENDECIES PRIOR USING A ROUTER AND OTHER LIKE FEATURES */
    /**in below there is a Provide; it is wrapping the whole app ({props.children}) */
    <GithubState>
    <Router>
    <div className="App">
    <Navbar />

    <Switch>
    <Route exact path = '/' component={Home}/>
    {/**as long as this is a single component, it can be routed this way: */}
    <Route exact path = '/contacts' component={Contacts} />

    <Route exact path = '/user/:login' component={User} />

    <Route exact path = '/user/:login/followers' component={Followers} />

    <Route exact path = '/user/:login/repos' component={UserRepos} />
    </Switch>

    </div>
    </Router>
    </GithubState>
  );
}



