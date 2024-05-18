import { useContext } from "react";
import "../styles/NavBarStyles.css";
import { Link } from "react-router-dom";
import AuthContext, { AuthContextType } from "../context/AuthProvider";

function NavBarLoggedIn() {
  const { logOut } = useContext(AuthContext) as AuthContextType;

  return (
    <div className="nav">
      <ul className="nav justify-content-left" style={{ flexGrow: 1 }}>
        <li className="nav-item">
          <Link to="/" className="nav-link">
            Home
          </Link>
        </li>
        <li className="nav-item">
          <Link to="/mytrips" className="nav-link">
            My trips
          </Link>
        </li>
      </ul>
      <ul className="nav justify-content-right">
        <li className="nav-item">
          <Link to="/" className="nav-link" onClick={logOut}>
            Log out
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default NavBarLoggedIn;
