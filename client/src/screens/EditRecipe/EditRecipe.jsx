import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { Button, FormInput, TextArea } from '../../components'
import { getOneRecipe, updateRecipe } from '../../services/api';

const defaultObj = {
  title: '',
  image: '',
  ingredients: '',
  preparation: '',
};

function EditRecipe() {
  const [recipe, setRecipe] = useState(defaultObj);
  const { id } = useParams();
  const history = useHistory();

  useEffect(() => {
    const fetchRecipe = async () => {
      const { fields } = await getOneRecipe(id);
      setRecipe(fields);
    };
    fetchRecipe();
    // eslint-disable-next-line
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    await updateRecipe(id, recipe);
    history.push(`/recipes/${id}`);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe(prevVal => ({ ...prevVal, [name]: value }));
  }

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-heading">Update Recipe</h2>
        <form onSubmit={handleSubmit}>
          <FormInput name="title" label="Title" value={recipe.title} onChange={handleChange} />
          <FormInput name="image" label="Image" value={recipe.image} onChange={handleChange} />
          <TextArea
            name="ingredients"
            label="Ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
            rows="10"
            placeholder={`Separate ingredients with a semicolon e.g. \n\n2 large potatoes; 3 cloves of garlic`}
          />
          <TextArea
            name="preparation"
            label="Preparation"
            value={recipe.preparation}
            onChange={handleChange}
            rows="10"
            placeholder={`Separate steps with a semicolon e.g. \n\npeel potatoes; slice potatoes`}
          />
          <Button text="Submit" />
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;
