import { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { Button, FormInput } from '../../components'
import { loginUser } from '../../services/api';

function Login({ setToken }) {
  const [user, setUser] = useState({});
  const [errMessage, setErrMessage] = useState('');
  const history = useHistory();

  function handleChange(e) {
    const { name, value } = e.target;
    setUser(prevVal => ({ ...prevVal, [name]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await loginUser(user);
    if (res.error) {
      setErrMessage(res.error);
    } else {
      setToken(res);
      setErrMessage('');
      history.push('/recipes');
    }
  }

  return (
    <div className="form-container">
      <div className="form">
        <h2 className="form-heading">Login</h2>
        <p className="err-message">{errMessage}</p>
        <form onSubmit={handleSubmit}>
          <FormInput name="username" label="Username" onChange={handleChange} />
          <FormInput
            type="password"
            name="password"
            label="Password"
            onChange={handleChange}
          />
          <Button text="Login" />
          <p className="redirect">Don't have an account?</p>
          <Link to="/register" className="redirect-link">
            Create account
          </Link>
        </form>
      </div>
    </div>
  );
}

export default Login;
