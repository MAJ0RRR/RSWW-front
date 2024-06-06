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
import { useNavigate, useParams } from "react-router-dom";
import ReservationResponseType from "../responesTypes/ReservationResponseType";

function PaymentPage() {
  const navigate = useNavigate();
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState<ReservationResponseType>({
    id: "",
    toHotelTransportOptionId: "",
    fromHotelTransportOptionId: "",
    hotelId: "",
    numberOfAdults: 0,
    numberOfUnder3: 0,
    numberOfUnder10: 0,
    numberOfUnder18: 0,
    dateTime: "",
    numberOfNights: 0,
    foodIncluded: false,
    rooms: [],
    price: 0,
    hotelName: "",
    hotelCity: "",
    typeOfTransport: "",
    fromCity: "",
    finalized: false,
    reservedUntil: "",
    cancellationDate: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [timeLeftForPayment, setTimeLeftForPayment] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get reservation
        const response = await axiosInstance.get<ReservationResponseType>(
          RESERVATION_ENDPOINT + `/${reservationId}`
        );
        setReservation(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handlePayment = async (formData) => {
    setLoading(true);
    const dataToSend = {
      creditCardNumber: formData.creditCardNumber,
      expirationDate: "2024-05-19",
      securityNumber: formData.securityNumber,
    } as ReservationBuy;
    try {
      const response = await axiosInstance.post(
        RESERVATION_ENDPOINT + `/${reservationId}` + "/Buy",
        { ...dataToSend }
      );
      if (response.status === 200) {
        navigate(`/reservation/${reservationId}`);
      }
    } catch (error) {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!reservation.finalized) {
      const timer = setInterval(() => {
        setTimeLeftForPayment(
          getTimeLeft(new Date(), new Date(reservation.reservedUntil))
        );
      }, 1000);
      return () => clearInterval(timer);
    }
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
              {!reservation.finalized && isTimeLeft(timeLeftForPayment) && (
                <ButtonToolbar>
                  <Button type="submit">Pay</Button>
                </ButtonToolbar>
              )}
              {!reservation.finalized && (
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
