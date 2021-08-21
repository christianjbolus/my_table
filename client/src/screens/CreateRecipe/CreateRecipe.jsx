import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';
import TextArea from '../../components/TextArea/TextArea';
import { createRecipe } from '../../services/api';
import './CreateRecipe.css';

const defaultObj = {
  title: '',
  image: '',
  ingredients: '',
  preparation: '',
  users: [],
};

function CreateRecipe({ token }) {
  const [recipe, setRecipe] = useState(defaultObj);
  const history = useHistory();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createRecipe(recipe);
    console.log(res);
    history.push('/recipes');
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setRecipe(prevVal => ({ ...prevVal, [name]: value, users: [token] }));
  }

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-heading">Create Recipe</h2>
        <form onSubmit={handleSubmit}>
          <FormInput name="title" label="Title" onChange={handleChange} />
          <FormInput name="image" label="Image" onChange={handleChange} />
          <TextArea
            name="ingredients"
            label="Ingredients"
            onChange={handleChange}
            rows="10"
            placeholder={`Separate ingredients with a semicolon e.g. \n\n2 large potatoes; 3 cloves of garlic`}
          />
          <TextArea
            name="preparation"
            label="Preparation"
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

export default CreateRecipe;
