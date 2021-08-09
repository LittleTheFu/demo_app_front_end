import { Login } from './login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainFrame } from './MainFrame';

export default function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/main">
          <MainFrame />
        </Route>
      </Switch>
    </Router>
  );
}
