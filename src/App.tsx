import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainFrame } from './MainFrame';
import { Login } from './page/LoginPage';

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
