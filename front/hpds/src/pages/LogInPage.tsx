import NavBarLoggedIn from "../components/NavBarLoggedIn";
import "../styles/FormStyles.css";
import { Form, ButtonToolbar, Button, DateInput } from "rsuite";

function LogInPage() {
  const handleLogin = (formData) => {
    // Tutaj dodaj kod obsługujący płatność, np. wysłanie danych do serwera
    console.log("Login done:", formData);
    // Możesz dodać tutaj również przekierowanie lub wyświetlenie komunikatu potwierdzającego
  };

  return (
    <>
      <NavBarLoggedIn />
      <div className="container">
        <div className="header">Log in</div>
        <div className="inputs">
          <Form onSubmit={handleLogin}>
            <Form.Group controlId="name">
              <Form.ControlLabel>Username:</Form.ControlLabel>
              <Form.Control name="username" />
            </Form.Group>
            <Form.Group controlId="password">
              <Form.ControlLabel>Password:</Form.ControlLabel>
              <Form.Control name="password" type="password" />
            </Form.Group>
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
