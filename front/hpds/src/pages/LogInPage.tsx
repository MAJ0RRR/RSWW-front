import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/FormStyles.css";
import AuthContext, { AuthContextType } from "../context/AuthProvider";
import { Form, ButtonToolbar, Button } from "rsuite";
import NavBar from "../components/NavBar";
import { LOGIN_ENDPOINT } from "../consts/consts";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";

function LogInPage() {
  const { setAuth } = useContext(AuthContext) as AuthContextType;
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (formValue: Record<string, any> | null) => {
    const formData = formValue as Record<string, any>; //asume it cannot be null

    setError(""); // Reset error message
    try {
      const response = await axiosInstance.post(`${LOGIN_ENDPOINT}`, {
        username: formData.username,
        password: formData.password,
      });
      const { token } = response.data; // Assuming the response contains a JSON object with a "token"

      setAuth({ is_logged_in: true, token });
      const from = (location.state as any)?.from || "/";
      navigate(from, { replace: false });
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setError("Login failed. Please check your username and password.");
      } else {
        setError("An error occurred. Please try again later.");
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="header">Log in</div>
        <div className="inputs">
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="name">
              <Form.ControlLabel>Username:</Form.ControlLabel>
              <Form.Control name="username" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password:</Form.ControlLabel>
              <Form.Control name="password" type="password" />
            </Form.Group>
            {error && <div className="error">{error}</div>}
            <Form.Group>
              <ButtonToolbar>
                <Button type="submit">Log in</Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}

export default LogInPage;
