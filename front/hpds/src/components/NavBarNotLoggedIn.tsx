import "../styles/NavBarStyles.css";
import { Link } from "react-router-dom";

function NavBarNotLoggedIn() {
  return (
    <div className="nav">
      <ul className="nav justify-content-left" style={{ flexGrow: 1 }}>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
      </ul>
      <ul className="nav justify-content-right">
        <li className="nav-item">
          <Link to="/login" className="nav-link">
            Log in
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBarNotLoggedIn;
