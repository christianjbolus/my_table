import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormInput } from '../../components'
import { createUser } from '../../services/api';
import './Register.css';

function Register({ setToken }) {
  const [user, setUser] = useState({});
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(prevVal => ({ ...prevVal, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await createUser(user);
    if (res.error) {
      setErrMessage(res.error);
    } else {
      setToken(res);
      history.push('/recipes');
    }
  }

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-heading">Sign Up</h2>
        <p className="err-message">{errMessage}</p>
        <form onSubmit={handleSubmit}>
          <FormInput name="username" label="Username" onChange={handleChange} />
          <FormInput
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button text="Sign Up" />
          <p className="redirect">Already have an account?</p>
          <Link to="/login" className="redirect-link">
            Sign in
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Register;
