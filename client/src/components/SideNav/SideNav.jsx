import { useHistory } from 'react-router-dom'
import NavItem from '../NavItem/NavItem';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import './SideNav.css';

function SideNav({ show, toggleShow, token, removeToken }) {
const history = useHistory()

  return (
    <div className={show ? 'side-nav-container show' : 'side-nav-container'}>
      <div className={show ? 'side-nav show' : 'side-nav'}>
        <div className="side-nav-header">
          <FontAwesomeIcon icon={faTimes} className="close" onClick={toggleShow} />
          <h2 onClick={() => {history.push('/'); toggleShow()}} className="brand">My Table</h2>
        </div>
        <ul className="side-nav-nav">
          <NavItem path="/recipes" onClick={toggleShow} text="All Recipes" className="side-nav-link" />
          <NavItem
            path="/recipes/new"
            onClick={toggleShow}
            text="Create Recipe"
            className="side-nav-link"
          />
          {token ? (
            <NavItem onClick={() => {removeToken(); toggleShow()}} text="Logout" className="side-nav-link" />
          ) : (
            <>
              <NavItem
                path="/register"
                onClick={toggleShow}
                text="Sign Up"
                className="side-nav-link"
              />
              <NavItem path="/login" onClick={toggleShow} text="Login" className="side-nav-link" />
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default SideNav;
