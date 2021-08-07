import Login from './login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomeBar from './HomeBar';

export default function App() {

  return (
    <Router>
      <Switch>
      <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <HomeBar />
        </Route>
      </Switch>
    </Router>
  );
}
