import Button from '../Button/Button';
import FormInput from '../FormInput/FormInput';
import TextArea from '../TextArea/TextArea';

function RecipeForm({ recipe, heading, handleChange, handleSubmit }) {

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-heading">{heading}</h2>
        <form onSubmit={handleSubmit}>
          <FormInput name="title" label="Title" value={recipe.title} onChange={handleChange} />
          <FormInput name="image" label="Image" value={recipe.image} onChange={handleChange} />
          <FormInput
            name="ingredients"
            label="Ingredients"
            value={recipe.ingredients}
            onChange={handleChange}
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

export default RecipeForm;
