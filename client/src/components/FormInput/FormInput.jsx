import './FormInput.css';

function FormInput({ label, type, value, name, onChange }) {
  return (
    <div className="form-input">
      <label htmlFor={name}>{label}</label>
      <input type={type} value={value} id={name} name={name} onChange={onChange} />
    </div>
  );
}

FormInput.defaultProps = {
  type: 'text',
};

export default FormInput;
