import { useHistory } from 'react-router-dom';
import Button from '../Button/Button';
import './Recipe.css';

function Recipe({ recipe }) {
  const history = useHistory();

  function handleClick() {
    history.push(`/recipes/${recipe.id}`);
  }

  return (
    <div>
      <div className="recipe-card">
        <img className="recipe-img" src={recipe.fields.image} alt={recipe.fields.title} onClick={handleClick} />
        <div className="card-body">
          <h3 className="recipe-title">{recipe.fields.title}</h3>
          <Button text="See Recipe" onClick={handleClick} />
        </div>
      </div>
    </div>
  );
}

export default Recipe;
