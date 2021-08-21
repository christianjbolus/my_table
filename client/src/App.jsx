import './App.css';
import useToken from './hooks/useToken';
import { Route, Switch, Redirect } from 'react-router-dom';
import { Navbar } from './components';
import {
  CreateRecipe,
  EditRecipe,
  LandingPage,
  Login,
  ListRecipes,
  RecipeDetail,
  Register,
} from './screens';

function App() {
  const { token, setToken, removeToken } = useToken();

  return (
    <div className="App">
      <Navbar token={token} removeToken={removeToken} />
      <Switch>
        <Route path="/" exact>
          <LandingPage token={token} />
        </Route>
        <Route path="/recipes" exact>
          <ListRecipes />
        </Route>
        <Route path="/recipes/new" exact>
          {token ? <CreateRecipe token={token} /> : <Redirect to="/login" />}
        </Route>
        <Route path="/recipes/:id" exact>
          <RecipeDetail token={token} />
        </Route>
        <Route path="/register" exact>
          <Register setToken={setToken} />
        </Route>
        <Route path="/login" exact>
          <Login setToken={setToken} />
        </Route>
        <Route path="/recipes/:id/edit" exact>
          {token ? <EditRecipe /> : <Redirect to="/login" />}
        </Route>
      </Switch>
    </div>
  );
}

export default App;
