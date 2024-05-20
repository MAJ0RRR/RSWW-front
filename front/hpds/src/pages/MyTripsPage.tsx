import { useContext, useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import "../styles/MyTripPageStyles.css";
import Button from "react-bootstrap/Button";
import ReservationResponseType from "../responesTypes/ReservationResponseType";
import AxiosContext, { AxiosContextType } from "../axios/AxiosProvider";
import { RESERVATION_ENDPOINT } from "../consts/consts";
import { useNavigate } from "react-router-dom";
import Timer from "../components/Timer";
import TimeLeft, { getTimeLeft } from "../utils/TimeLeft";

function MyTripsPage() {
  const navigate = useNavigate();
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeftForPayment, setTimeLeftForPayment] = useState<{
    [key: string]: TimeLeft;
  }>({});
  const [myReservations, setMyReservations] = useState<
    ReservationResponseType[]
  >([]);

  // get data
  useEffect(() => {
    const fetchData = async () => {
      try {
        // get reservations
        const response = await axiosInstance.get<ReservationResponseType[]>(
          RESERVATION_ENDPOINT
        );
        setMyReservations(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // turn on timer
  useEffect(() => {
    myReservations.forEach((reservation) => {
      if (!reservation.finalized) {
        const timer = setInterval(() => {
          setTimeLeftForPayment((prevTimeLeft) => ({
            ...prevTimeLeft,
            [reservation.id]: getTimeLeft(
              new Date(),
              new Date(reservation.reservedUntil)
            ),
          }));
        }, 1000);
        return () => clearInterval(timer);
      }
    });
  }, [timeLeftForPayment]);

  const getStatusStyle = (reservation: ReservationResponseType) => {
    if (reservation.cancellationDate && reservation.finalized) {
      return "middle-60 font-size-36 color-red";
    } else if (!reservation.cancellationDate && reservation.finalized) {
      return "middle-60 font-size-36 color-green";
    } else {
      return "middle-60 font-size-36 color-orange";
    }
  };
  const determineStatus = (reservation: ReservationResponseType) => {
    if (reservation.cancellationDate && reservation.finalized) {
      return "No payment in given time";
    } else if (!reservation.cancellationDate && reservation.finalized) {
      return "Payment done";
    } else {
      return "No reservation";
    }
  };

  return (
    <>
      <NavBar />
      <div className="page-content">
        <div className="page-title">My trips</div>
        {error && <div>Error occured</div>}
        {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
        {!loading && myReservations.length === 0 && <div>No trips</div>}
        {!loading && myReservations.length > 0 && (
          <>
            {myReservations.map((item) => (
              <div className="page-section-content">
                <div className="elements">
                  <div className="left-20 font-size-36">{item.hotelName}</div>
                  <div className={getStatusStyle(item)}>
                    {determineStatus(item)}
                  </div>
                  <div className="right-20 font-size-36">{item.price} PLN</div>
                </div>
                <div className="elements">
                  <div className="left-50">
                    Address: {item.fromCity} <br />
                    Transport: {item.typeOfTransport}
                    <br />
                    Date: {item.dateTime}
                    <br />
                    Duration: {item.numberOfNights}
                    <br />
                  </div>
                  <div className="right-50-relative">
                    <div className="bottom-right">
                      {determineStatus(item) === "No reservation" && (
                        <span style={{ fontSize: "24px" }}>
                          <Timer
                            minutes={timeLeftForPayment[item.id]?.minutes}
                            seconds={timeLeftForPayment[item.id]?.seconds}
                          />
                        </span>
                      )}
                      <Button
                        variant="secondary"
                        className="button-style"
                        onClick={() => {
                          navigate(RESERVATION_ENDPOINT + `${item.id}`);
                        }}
                      >
                        Details
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}

export default MyTripsPage;
