import { Link } from 'react-router-dom';

function NavItem({ path, text, onClick, className }) {
  return (
    <Link to={path || '/recipes'} onClick={onClick} className={className}>
      {text}
    </Link>
  );
}

export default NavItem;
