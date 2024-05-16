import NavBarLoggedIn from "../components/NavBarLoggedIn";
import "../styles/FormStyles.css";
import { Form, ButtonToolbar, Button, DateInput } from "rsuite";

function PaymentPage() {
  const handlePayment = (formData, event) => {
    // Tutaj dodaj kod obsługujący płatność, np. wysłanie danych do serwera
    console.log("Płatność została przetworzona:", formData);
    // Możesz dodać tutaj również przekierowanie lub wyświetlenie komunikatu potwierdzającego
  };

  return (
    <>
      <NavBarLoggedIn />
      <div className="container">
        <div className="header">Payment</div>
        <div className="inputs">
          <Form onSubmit={handlePayment}>
            <Form.Group>
              <Form.ControlLabel>Credit card number:</Form.ControlLabel>
              <Form.Control name="credit_card_number" />
            </Form.Group>
            <Form.Group controlId="datePicker">
              <Form.ControlLabel>
                Credit card expiration date:
              </Form.ControlLabel>
              <Form.Control
                name="datePicker"
                accepter={DateInput}
                format="MM/yyyy"
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Credit card secure code:</Form.ControlLabel>
              <Form.Control name="credit_card_secure_code" />
            </Form.Group>
            <Form.Group>
              <ButtonToolbar>
                <Button appearance="primary" type="submit">
                  Pay
                </Button>
              </ButtonToolbar>
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
