import { useContext, useState } from "react";
import "../styles/FormStyles.css";
import AuthContext, { AuthContextType } from "../context/AuthProvider";
import { Form, ButtonToolbar, Button } from "rsuite";
import NavBar from "../components/NavBar";

function LogInPage() {
  const { setAuth } = useContext(AuthContext) as AuthContextType;
  const [error, setError] = useState("");

  const handleSubmit = async (formValue: Record<string, any> | null) => {
    const formData = formValue as Record<string, any>; //asume it cannot be null

    setError(""); // Reset error message
    try {
      const response = await fetch("http://127.0.0.1:8000/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
        // credentials: 'include',    // CORS Policies NEED TO BE SET FOR THIS
      });
      if (response.ok) {
        // Assuming the response contains a JSON object with a "token"
        const data = await response.json();

        setAuth({ is_logged_in: true, token: data.token });
        // TODO Redirect
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (err) {
      setError("An error occurred. Please try again later.");
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
