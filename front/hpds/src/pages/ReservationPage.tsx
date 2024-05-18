import NavBar from "../components/NavBar";
import "../styles/ReservationPageStyles.css";
import "rsuite/dist/rsuite.min.css";
import Button from "react-bootstrap/Button";
import { InputNumber } from "rsuite";
import { Checkbox } from "rsuite";

function ReservationPage() {
  //mocked vairables
  const page_status = "noPayment";
  const reservation = {
    toHotelTransportOptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    fromHotelTransportOptionId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    hotelId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    numberOfAdults: 1,
    numberOfUnder3: 1,
    numberOfUnder10: 1,
    numberOfUnder18: 1,
    dateTime: "2024-05-15T15:22:34.025Z",
    numberOfNights: 2,
    foodIncluded: false,
    rooms: [
      {
        size: 2,
        number: 1,
      },
      {
        size: 6,
        number: 2,
      },
    ],
    price: 1000,
    hotelName: "hotelName",
    hotelCity: "hotelCity",
    typeOfTransport: "Plane",
    fromCity: "fromCity",
    finalized: true,
    reservedUntil: "2024-05-15T15:22:34.025Z",
  };
  const fromHotelTransportOption = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    type: "Plane",
    start: "2024-05-15T15:24:41.210Z",
    end: "2024-05-15T15:24:41.210Z",
    seatsAvailable: 0,
    fromCountry: "fromCountry",
    fromCity: "fromCity",
    fromStreet: "fromStreet",
    fromShowName: "fromShowName",
    toCountry: "toCountry",
    toCity: "toCity",
    toStreet: "toStreet",
    toShowName: "toShowName",
    priceAdult: 1,
    priceUnder3: 2,
    priceUnder10: 3,
    priceUnder18: 4,
  };
  const toHotelTransportOption = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    type: "Plane",
    start: "2024-05-15T15:24:41.210Z",
    end: "2024-05-15T15:24:41.210Z",
    seatsAvailable: 0,
    fromCountry: "FromCountry",
    fromCity: "FromCity",
    fromStreet: "FromStreet",
    fromShowName: "fromShowName",
    toCountry: "toCountry",
    toCity: "toCity",
    toStreet: "toStreet",
    toShowName: "toShowName",
    priceAdult: 1,
    priceUnder3: 2,
    priceUnder10: 3,
    priceUnder18: 4,
  };
  const hotel = {
    id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    name: "HotelName",
    country: "Country",
    city: "City",
    street: "Street",
    foodPricePerPerson: 20,
    rooms: [
      {
        price: 10,
        size: 2,
        count: 3,
      },
      {
        price: 20,
        size: 3,
        count: 6,
      },
      {
        price: 20,
        size: 6,
        count: 12,
      },
    ],
  };
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
    reservation.rooms
      .map(
        (room) =>
          hotel.rooms.find((hotel_room) => hotel_room.size === room.size)
            .price * room.number
      )
      .reduce((sum, current) => sum + current, 0) * reservation.numberOfNights;
  const totalFoodPrice = reservation.foodIncluded
    ? hotel.foodPricePerPerson * reservation.numberOfNights * totalPeople
    : 0;
  const hotelPrice = totalFoodPrice + totalRoomPrice;

  return (
    <>
      <NavBar />
      <div className="page-content">
        <div className="page-title">Trip to Hotel Gołebiewski</div>
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
                  {reservation.foodIncluded ? (
                    <Checkbox defaultChecked disabled></Checkbox>
                  ) : (
                    <Checkbox disabled></Checkbox>
                  )}
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
            {page_status === "toBuy" && (
              <>
                Time left: 00:00
                <Button variant="secondary" className="button-style">
                  Buy
                </Button>
              </>
            )}
            {page_status === "paymentDone" && (
              <span style={{ color: "green" }}>Paid</span>
            )}
            {page_status === "noPayment" && (
              <span style={{ color: "red" }}>No payment</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationPage;
