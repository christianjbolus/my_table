import { useState, useEffect } from 'react';
import Recipe from '../../components/Recipe/Recipe';
import { getAllRecipes } from '../../services/api';
import './ListRecipes.css'

function ListRecipes() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const res = await getAllRecipes();
      setRecipes(res);
    };
    fetchRecipes();
  }, []);

  return (
    <div className="recipe-container">
      {recipes.map(recipe => (
        <Recipe recipe={recipe} key={recipe.id} />
      ))}
    </div>
  );
}

export default ListRecipes;
