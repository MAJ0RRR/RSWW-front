import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/FormStyles.css";
import { Form, ButtonToolbar, Button, DateInput } from "rsuite";
import TimeLeft, { getTimeLeft, isTimeLeft } from "../utils/TimeLeft";
import Timer from "../components/Timer";
import ReservationBuy from "../requestsTypes/ReservationBuy";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";
import { RESERVATION_ENDPOINT } from "../consts/consts";
import { useLocation, useNavigate } from "react-router-dom";

function PaymentPage() {
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handlePayment = async (formData: Record<string, any>) => {
    setLoading(true);
    const dataToSend = {
      creditCardNumber: formData.creditCardNumber,
      expirationDate: "2024-05-19",
      securityNumber: formData.securityNumber,
    } as ReservationBuy;
    try {
      const response = await axiosInstance.post(
        RESERVATION_ENDPOINT + `/${location.state.reservationId}` + "/Buy",
        { ...dataToSend }
      );
      if (response.data === true) {
        navigate(`/reservation/${location.state.reservationId}`);
      } else {
        setError("Lack of funds / expired card / incorrect data");
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const reservation = {
    reservedUntil: "2024-05-18T19:09:30.025Z",
  };

  const [reservationFinalized, setReservationFinalized] = useState(false);
  const [timeLeftForPayment, setTimeLeftForPayment] = useState<TimeLeft>(
    getTimeLeft(new Date(), new Date(reservation.reservedUntil))
  );

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setTimeLeftForPayment(
  //       getTimeLeft(new Date(), new Date(reservation.reservedUntil))
  //     );
  //   }, 1000);
  //   return () => clearInterval(timer);
  // }, [reservation.reservedUntil, timeLeftForPayment]);

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="header">Payment</div>
        <div className="inputs">
          <Form onSubmit={handlePayment}>
            <Form.Group>
              <Form.ControlLabel>Credit card number:</Form.ControlLabel>
              <Form.Control name="creditCardNumber" />
            </Form.Group>
            <Form.Group controlId="datePicker">
              <Form.ControlLabel>
                Credit card expiration date:
              </Form.ControlLabel>
              <Form.Control
                name="expirationDate"
                accepter={DateInput}
                format="MM/yyyy"
              />
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Credit card secure code:</Form.ControlLabel>
              <Form.Control name="securityNumber" />
            </Form.Group>
            <Form.Group>
              {!reservationFinalized && isTimeLeft(timeLeftForPayment) && (
                <ButtonToolbar>
                  <Button type="submit">Pay</Button>
                </ButtonToolbar>
              )}
              {!reservationFinalized && !isTimeLeft(timeLeftForPayment) && (
                <ButtonToolbar>
                  <Button type="submit">Pay</Button>
                </ButtonToolbar>
              )}
              {!reservationFinalized && (
                <Timer
                  minutes={timeLeftForPayment.minutes}
                  seconds={timeLeftForPayment.seconds}
                />
              )}
              {loading && <div>Loading...</div>}
              {error && <div>{error}</div>}
            </Form.Group>
          </Form>
        </div>
      </div>
    </>
  );
}

export default PaymentPage;
