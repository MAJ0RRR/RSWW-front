import { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/FormStyles.css";
import { Form, ButtonToolbar, Button, DateInput } from "rsuite";
import TimeLeft, { getTimeLeft, isTimeLeft } from "../utils/TimeLeft";
import Timer from "../components/Timer";

function PaymentPage() {
  const handlePayment = (formData: Record<string, any> | null) => {
    // Tutaj dodaj kod obsługujący płatność, np. wysłanie danych do serwera
    console.log("Płatność została przetworzona:", formData);
    // Możesz dodać tutaj również przekierowanie lub wyświetlenie komunikatu potwierdzającego
  };

  const reservation = {
    reservedUntil: "2024-05-18T19:09:30.025Z",
  };

  const [reservationFinalized, setReservationFinalized] = useState(false);
  const [timeLeftForPayment, setTimeLeftForPayment] = useState<TimeLeft>(
    getTimeLeft(new Date(), new Date(reservation.reservedUntil))
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeftForPayment(
        getTimeLeft(new Date(), new Date(reservation.reservedUntil))
      );
    }, 1000);
    return () => clearInterval(timer);
  }, [reservation.reservedUntil, timeLeftForPayment]);

  return (
    <>
      <NavBar />
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
              {!reservationFinalized && isTimeLeft(timeLeftForPayment) && (
                <ButtonToolbar>
                  <Button type="submit">Pay</Button>
                </ButtonToolbar>
              )}
              {!reservationFinalized && !isTimeLeft(timeLeftForPayment) && (
                <ButtonToolbar>
                  <Button type="submit" disabled={true}>
                    Pay
                  </Button>
                </ButtonToolbar>
              )}
              {!reservationFinalized && (
                <>
                  <Timer
                    minutes={timeLeftForPayment.minutes}
                    seconds={timeLeftForPayment.seconds}
                  />
                </>
              )}
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
