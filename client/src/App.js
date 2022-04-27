import './App.css';
import { Route } from 'react-router-dom';
import Home from "./components/Home/Home"
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import CreateRecipe from './components/CreateRecipe/CreateRecipe';


function App() {
  return (
    <div className="App">
      <Route exact path='/home' component={Home} />
      <Route exact path='/recipes/detail/:id' component={RecipeDetail} />
      <Route exact path='/create/recipe' component={CreateRecipe} />
    </div>
  );
}

export default App;
