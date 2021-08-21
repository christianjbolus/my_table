import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NavItem from '../NavItem/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Navbar.css';
import SideNav from '../SideNav/SideNav';

function Navbar({ token, removeToken }) {
  const [show, setShow] = useState(false);
  const history = useHistory();

  function toggleShow() {
    setShow(prevVal => !prevVal);
  }

  return (
    <div>
      <SideNav show={show} toggleShow={toggleShow} token={token} removeToken={removeToken} />
      <div className="navbar-container">
        <div className="navbar">
          <ul className="navbar-nav">
            <FontAwesomeIcon icon={faBars} size="lg" className="icon" onClick={toggleShow} />
            <NavItem path="/recipes" text="All Recipes" className="nav-link" />
            <NavItem path="/recipes/new" text="Create Recipe" className="nav-link" />
          </ul>
          <div className="brand-container">
            <h1 onClick={() => history.push('/')} className="brand">
              My Table
            </h1>
          </div>
          <ul className="navbar-auth">
            {token ? (
              <NavItem onClick={removeToken} text="Logout" className="nav-link" />
            ) : (
              <>
                <NavItem path="/register" text="Sign Up" className="nav-link" />
                <NavItem path="/login" text="Login" className="nav-link" />
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
