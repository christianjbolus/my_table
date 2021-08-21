import React from 'react';
import { useHistory } from 'react-router-dom';
import { Button } from '../../components'
import './LandingPage.css';

function LandingPage({token}) {
  const history = useHistory();

  return (
    <div className="landing-container">
      <h1 className="landing-heading">Welcome to My Table</h1>
      {!token && <Button text="Get Started" onClick={() => history.push('/register')} />}
    </div>
  );
}

export default LandingPage;
