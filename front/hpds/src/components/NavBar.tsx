import { useContext } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";
import NavBarLoggedIn from "./NavBarLoggedIn";
import NavBarNotLoggedIn from "./NavBarNotLoggedIn";

function NavBar() {
  const { auth } = useContext(AuthContext) as AuthContextType;

  if (auth.is_logged_in) {
    return <NavBarLoggedIn />;
  } else {
    return <NavBarNotLoggedIn />;
  }
}

export default NavBar;
