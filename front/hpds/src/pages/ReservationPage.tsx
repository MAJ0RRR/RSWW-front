import NavBar from "../components/NavBar";
import "../styles/ReservationPageStyles.css";
import "rsuite/dist/rsuite.min.css";
import { Button, InputNumber } from "rsuite";
import { Checkbox } from "rsuite";
import { useContext, useEffect, useState } from "react";
import TimeLeft, { getTimeLeft, isTimeLeft } from "../utils/TimeLeft";
import Timer from "../components/Timer";
import { useNavigate, useParams } from "react-router-dom";
import ReservationResponseType from "../responesTypes/ReservationResponseType";
import TransportOptionResponseType from "../responesTypes/TransportOptionResponseType";
import HotelResponseType from "../responesTypes/HotelResponseType";
import {
  HOTEL_OPTION_ENDPOINT,
  RESERVATION_ENDPOINT,
  TRANSPORT_OPTION_ENDPOINT,
} from "../consts/consts";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";

function ReservationPage() {
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const navigate = useNavigate();
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [timeLeftForPayment, setTimeLeftForPayment] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
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
  const [fromHotelTransportOption, setFromHotelTransportOption] =
    useState<TransportOptionResponseType>({
      id: "",
      type: "",
      start: "",
      end: "",
      seatsAvailable: 0,
      fromCountry: "",
      fromCity: "",
      fromStreet: "",
      fromShowName: "",
      toCountry: "",
      toCity: "",
      toStreet: "",
      toShowName: "",
      priceAdult: 0,
      priceUnder3: 0,
      priceUnder10: 0,
      priceUnder18: 0,
    });
  const [toHotelTransportOption, setToHotelTransportOption] =
    useState<TransportOptionResponseType>({
      id: "",
      type: "",
      start: "",
      end: "",
      seatsAvailable: 0,
      fromCountry: "",
      fromCity: "",
      fromStreet: "",
      fromShowName: "",
      toCountry: "",
      toCity: "",
      toStreet: "",
      toShowName: "",
      priceAdult: 0,
      priceUnder3: 0,
      priceUnder10: 0,
      priceUnder18: 0,
    });
  const [hotel, setHotel] = useState<HotelResponseType>({
    id: "",
    name: "",
    country: "",
    city: "",
    street: "",
    foodPricePerPerson: 0,
    rooms: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        // get reservation data
        const reservationResponse =
          await axiosInstance.get<ReservationResponseType>(
            RESERVATION_ENDPOINT + `/${reservationId}`
          );
        const reservationData = reservationResponse.data;

        // get transportoption data and hotel data in parallel
        const [
          fromHotelTransportOptionResponse,
          toHotelTransportOptionResponse,
          hotelResponse,
        ] = await Promise.all([
          axiosInstance.get<TransportOptionResponseType>(
            TRANSPORT_OPTION_ENDPOINT +
              `/${reservationData.fromHotelTransportOptionId}`
          ),
          axiosInstance.get<TransportOptionResponseType>(
            TRANSPORT_OPTION_ENDPOINT +
              `/${reservationData.toHotelTransportOptionId}`
          ),
          axiosInstance.get<HotelResponseType>(
            HOTEL_OPTION_ENDPOINT + `/${reservationData.hotelId}`
          ),
        ]);

        // set all states at once
        setReservation(reservationData);
        setFromHotelTransportOption(fromHotelTransportOptionResponse.data);
        setToHotelTransportOption(toHotelTransportOptionResponse.data);
        setHotel(hotelResponse.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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

  // calculations
  const transportFromPrice =
    reservation.numberOfAdults * fromHotelTransportOption.priceAdult +
    reservation.numberOfUnder3 * fromHotelTransportOption.priceUnder3 +
    reservation.numberOfUnder10 * fromHotelTransportOption.priceUnder10 +
    reservation.numberOfUnder18 * fromHotelTransportOption.priceUnder18;
  const transportToPrice =
    reservation.numberOfAdults * toHotelTransportOption.priceAdult +
    reservation.numberOfUnder3 * toHotelTransportOption.priceUnder3 +
    reservation.numberOfUnder10 * toHotelTransportOption.priceUnder10 +
    reservation.numberOfUnder18 * toHotelTransportOption.priceUnder18;
  const totalTransportPrice = transportFromPrice + transportToPrice;
  const totalPeople =
    reservation.numberOfAdults +
    reservation.numberOfUnder3 +
    reservation.numberOfUnder10 +
    reservation.numberOfUnder18;
  let totalRoomPriceString = reservation.rooms
    .map(
      (room) =>
        `${
          hotel.rooms.find((hotel_room) => hotel_room.size === room.size)?.price
        } PLN * ${room.number}`
    )
    .join(" + ");
  totalRoomPriceString =
    `(${totalRoomPriceString})` +
    " x " +
    `${reservation.numberOfNights}` +
    " nights";

  const totalRoomPrice =
    reservation.rooms.length > 0
      ? reservation.rooms
          .map(
            (room) =>
              hotel.rooms.find((hotel_room) => hotel_room.size === room.size)
                .price * room.number
          )
          .reduce((sum, current) => sum + current, 0) *
        reservation.numberOfNights
      : 0;
  const totalFoodPrice = reservation.foodIncluded
    ? hotel.foodPricePerPerson * reservation.numberOfNights * totalPeople
    : 0;
  const hotelPrice = totalFoodPrice + totalRoomPrice;

  return (
    <>
      <NavBar />
      <div className="page-content-my-trips-and-reservation">
        <div className="page-title">Trip to {hotel.name}</div>
        <div className="page-section">
          <div className="page-section-title">General info</div>
          <div className="page-section-content">
            <div className="page-section-content-title">Date</div>
            <div className="page-section-content-content">
              Start: {fromHotelTransportOption.start} <br />
              End: {toHotelTransportOption.end}
            </div>
          </div>
          <div className="page-section-content">
            <div className="page-section-content-title">
              People configuration
            </div>
            <div className="page-section-content-content">
              Adults: {reservation.numberOfAdults} <br />
              Kinds under 3: {reservation.numberOfUnder3} <br />
              Kids under 10: {reservation.numberOfUnder10} <br />
              Kids under 18: {reservation.numberOfUnder18} <br />
            </div>
          </div>
        </div>
        <div className="page-section">
          <div className="two-elements">
            <div className="left">
              <div className="page-section-title">Transport</div>
            </div>
            <div className="right">{totalTransportPrice} PLN</div>
          </div>
          <div className="page-section-content">
            <div className="two-elements">
              <div className="left">
                <div className="page-section-content-title">
                  From {fromHotelTransportOption.fromCity} to{" "}
                  {fromHotelTransportOption.toCity}
                </div>
              </div>
              <div className="right page-section-content-title">
                {transportFromPrice} PLN
              </div>
            </div>
            <div className="page-section-content-content">
              Transport type: {fromHotelTransportOption.type} <br />
              From: {fromHotelTransportOption.fromShowName} <br />
              To: {fromHotelTransportOption.toShowName} <br />
              Start date: {fromHotelTransportOption.start} <br />
              End date: {fromHotelTransportOption.end}
            </div>
          </div>
          <div className="page-section-content">
            <div className="two-elements">
              <div className="left">
                <div className="page-section-content-title">
                  From {toHotelTransportOption.fromCity} to{" "}
                  {toHotelTransportOption.toCity}
                </div>
              </div>
              <div className="right page-section-content-title">
                {transportToPrice} PLN
              </div>
            </div>
            <div className="page-section-content-content">
              Transport type: {toHotelTransportOption.type} <br />
              From: {toHotelTransportOption.fromShowName} <br />
              To: {toHotelTransportOption.toShowName} <br />
              Start date: {toHotelTransportOption.start} <br />
              End date: {toHotelTransportOption.end}
            </div>
          </div>
        </div>
        <div className="page-section">
          <div className="two-elements">
            <div className="left">
              <div className="page-section-title">Hotel</div>
            </div>
            <div className="right">{hotelPrice} PLN</div>
          </div>
          <div className="page-section-content">
            <div className="page-section-content-title">Details</div>
            <div className="page-section-content-content">
              Name: {hotel.name} <br />
              Country: {hotel.country} <br />
              Address: address
            </div>
          </div>
          <div className="page-section-content">
            <div className="page-section-content-title">Food configuration</div>
            <div className="page-section-content-content">
              <div className="user-input">
                <div className="left">
                  <label htmlFor="food">Food</label>
                </div>
                <div className="right">
                  {hotel.foodPricePerPerson * totalPeople} PLN (per night)
                  <Checkbox checked={reservation.foodIncluded} disabled />
                </div>
              </div>
              <div className="user-input-result-one">
                {reservation.foodIncluded ? (
                  <>
                    Food total: {hotel.foodPricePerPerson * totalPeople} PLN x{" "}
                    {reservation.numberOfNights} nights = {totalFoodPrice} PLN
                  </>
                ) : (
                  <>Food total: 0 PLN</>
                )}
              </div>
            </div>
            <div className="page-section-content-title">Room configuration</div>
            <div className="page-section-content-content">
              {reservation.rooms.map((item) => (
                <div className="user-input">
                  <div className="left">
                    <label>Size {item.size}</label>
                  </div>
                  <div className="right">
                    {hotel.rooms.find((room) => room.size === item.size)?.price}{" "}
                    PLN (per night)
                    <div style={{ display: "inline-block" }}>
                      <InputNumber
                        disabled
                        defaultValue={item.number}
                        style={{ width: 100 }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="user-input-result-two">
              <div className="user-input-result-two-left"></div>
              <div className="user-input-result-two-right">
                Rooms total: {totalRoomPriceString} = {totalRoomPrice} PLN
              </div>
            </div>
          </div>
        </div>
        <div className="two-elements">
          <div className="left">
            Total: {hotelPrice + totalTransportPrice} PLN
          </div>
          <div className="right">
            {!reservation.finalized && isTimeLeft(timeLeftForPayment) && (
              <>
                <Timer
                  minutes={timeLeftForPayment.minutes}
                  seconds={timeLeftForPayment.seconds}
                />
              </>
            )}
            {reservation.finalized && reservation.cancellationDate && (
              <span style={{ color: "red" }}>No payment</span>
            )}
            {reservation.finalized && !reservation.cancellationDate && (
              <span style={{ color: "green" }}>Paid</span>
            )}
            {!reservation.finalized && isTimeLeft(timeLeftForPayment) && (
              <Button
                className="button-style"
                onClick={() => navigate(`/payment/${reservationId}`)}
              >
                Buy
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationPage;
