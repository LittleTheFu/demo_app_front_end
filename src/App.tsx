import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { MainFrame } from './MainFrame';
import { Login } from './page/LoginPage';
import { Provider } from 'react-redux';
import { store } from './reducer/rootReducer';

export default function App() {

  return (
    <Provider store={store}>
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
    </Provider>
  );
}
