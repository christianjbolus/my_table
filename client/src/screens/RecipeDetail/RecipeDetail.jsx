import { getOneRecipe, deleteRecipe, getUser } from '../../services/api';
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import { ListItems } from '../../components';
import './RecipeDetail.css';

function RecipeDetail({ token }) {
  const [recipe, setRecipe] = useState({});
  const [username, setUsername] = useState('');
  const [isAuthor, setIsAuthor] = useState(false);

  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchData = async () => {
      const { fields } = await getOneRecipe(id);
      determineAuthor(fields.users[0], token);
      setRecipe({
        ...fields,
        ingredients: convertStrToArr(fields.ingredients),
        preparation: convertStrToArr(fields.preparation),
      });
      // Use the user id returned from fields.users[0] to get username to display
      const {
        fields: { username },
      } = await getUser(fields.users[0]);
      setUsername(username);
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  function determineAuthor(userId, token) {
    if (userId === token) {
      setIsAuthor(true);
    }
  }

  async function handleDelete() {
    await deleteRecipe(id);
    history.push('/recipes');
  }

  return (
    <div className="detail-recipe-card">
      <div className="card-heading">
        <div className="card-title">
          <h2 className="detail-recipe-title">{recipe?.title}</h2>
          <p>By: {username}</p>
        </div>
        <img src={recipe?.image} alt={`${recipe?.title}`} />
      </div>
      <div className="detail-card-body">
        <div className="card-content">
          <h3 className="heading">Ingredients</h3>
          <hr />
          <ListItems items={recipe?.ingredients} numbered={false} />
        </div>
        <div className="card-content">
          <h3 className="heading">Preparation</h3>
          <hr />
          <ListItems items={recipe?.preparation} numbered={true} />
        </div>
      </div>
      {isAuthor && (
        <div className="edit">
          <FontAwesomeIcon
            icon={faEdit}
            size="lg"
            className="edit-icon"
            onClick={() => history.push(`/recipes/${id}/edit`)}
          />
          <FontAwesomeIcon
            icon={faTrashAlt}
            size="lg"
            className="edit-icon"
            onClick={handleDelete}
          />
        </div>
      )}
    </div>
  );
}

export default RecipeDetail;

// Turn semi-colon separated string into array
function convertStrToArr(str) {
  return str.split(';');
}
