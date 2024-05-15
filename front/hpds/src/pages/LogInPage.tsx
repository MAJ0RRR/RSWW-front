import NavBarNotLoggedIn from "../components/NavBarNotLoggedIn";
import Button from "react-bootstrap/Button";
import "../styles/FormStyles.css";

function LogInPage() {
  return (
    <>
      <NavBarNotLoggedIn />
      <div className="container">
        <div className="header">Log in</div>
        <div className="inputs">
          <div className="input">
            <input type="text" placeholder="Login" name="login" required />
          </div>
          <div className="input">
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
            />
          </div>
        </div>
        <div className="submit-container">
          <div className="buttons">
            <Button variant="secondary">Log in</Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
