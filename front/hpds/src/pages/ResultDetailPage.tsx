import NavBar from "../components/NavBar";
import "../styles/ReservationPageStyles.css";
import "rsuite/dist/rsuite.min.css";
import Button from "react-bootstrap/Button";
import { InputNumber } from "rsuite";
import { Checkbox } from "rsuite";
import { useState } from "react";
import { useContext } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";

function ResultDetailPage() {
  const { auth } = useContext(AuthContext) as AuthContextType;
  const navigate = useNavigate();

  //mocked variables
  const numberOfAdults = 1;
  const numberOfUnder3 = 1;
  const numberOfUnder10 = 1;
  const numberOfUnder18 = 1;
  const numberOfNights = 1;
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
    numberOfAdults * fromHotelTransportOption.priceAdult +
    numberOfUnder3 * fromHotelTransportOption.priceUnder3 +
    numberOfUnder10 * fromHotelTransportOption.priceUnder10 +
    numberOfUnder18 * fromHotelTransportOption.priceUnder18;
  const transportToPrice =
    numberOfAdults * toHotelTransportOption.priceAdult +
    numberOfUnder3 * toHotelTransportOption.priceUnder3 +
    numberOfUnder10 * toHotelTransportOption.priceUnder10 +
    numberOfUnder18 * toHotelTransportOption.priceUnder18;
  const totalTransportPrice = transportFromPrice + transportToPrice;
  const totalPeople =
    numberOfAdults + numberOfUnder3 + numberOfUnder10 + numberOfUnder18;

  const [totalRoomPriceString, setTotalRoomPriceString] = useState("");
  const [totalRoomPrice, setTotalRoomPrice] = useState(0);
  const [foodIncluded, setFoodIncluded] = useState(false);

  const totalFoodPrice = foodIncluded
    ? hotel.foodPricePerPerson * totalPeople * numberOfNights
    : 0;

  const [roomPrices, setRoomPrices] = useState({});
  const [checkedRooms, setCheckedRooms] = useState([]);
  const hotelPrice = totalFoodPrice + totalRoomPrice;

  const handleRoomChange = (size, count, price) => {
    const newRoomPrices = { ...roomPrices, [size]: count * price };
    setRoomPrices(newRoomPrices);

    const newCheckedRooms = checkedRooms.filter((room) => room.size !== size);
    if (count > 0) {
      newCheckedRooms.push({ size, count, total: count * price });
    }
    setCheckedRooms(newCheckedRooms);

    const newTotalRoomPrice = Object.values(newRoomPrices).reduce(
      (acc, curr) => acc + curr,
      0
    );
    setTotalRoomPrice(newTotalRoomPrice);
    setTotalRoomPriceString(
      newCheckedRooms
        .map((room) => `${room.total / room.count} PLN * ${room.count}`)
        .join(" + ") || ""
    );
  };
  const handleReserve = () => {
    console.log(checkedRooms);
    console.log(window.location.pathname);
    if (!auth.is_logged_in) {
      navigate("/login", { state: { from: window.location.pathname } });
    }
  };

  return (
    <>
      <NavBar />
      <div className="page-content">
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
              Adults: {numberOfAdults} <br />
              Kids under 3: {numberOfUnder3} <br />
              Kids under 10: {numberOfUnder10} <br />
              Kids under 18: {numberOfUnder18} <br />
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
              Address: {hotel.street}, {hotel.city}, {hotel.country}
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
                  <Checkbox
                    onChange={(value: any, checked: boolean, event) =>
                      checked ? setFoodIncluded(true) : setFoodIncluded(false)
                    }
                  />
                </div>
              </div>
              <div className="user-input-result-one">
                {foodIncluded ? (
                  <>
                    Food total: {hotel.foodPricePerPerson * totalPeople} PLN x{" "}
                    {numberOfNights} nights = {totalFoodPrice} PLN
                  </>
                ) : (
                  <>Food total: 0 PLN</>
                )}
              </div>
            </div>
            <div className="page-section-content-title">Room configuration</div>
            <div className="page-section-content-content">
              {hotel.rooms.map((item) => (
                <div className="user-input">
                  <div className="left">
                    <label>
                      Size {item.size} (available {item.count})
                    </label>
                  </div>
                  <div className="right">
                    {item.price} PLN (per night)
                    <div style={{ display: "inline-block" }}>
                      <InputNumber
                        defaultValue={0}
                        min={0}
                        max={item.count}
                        style={{ width: 100 }}
                        onChange={(value) =>
                          handleRoomChange(item.size, value, item.price)
                        }
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="user-input-result-two">
              <div className="user-input-result-two-left">
                Rooms capacity:{" "}
                {checkedRooms.reduce(
                  (acc, room) => acc + room.size * room.count,
                  0
                )}
                /{totalPeople}
              </div>
              <div className="user-input-result-two-right">
                {totalRoomPriceString.length > 0 ? (
                  <>
                    Rooms total: {totalRoomPriceString} = {totalRoomPrice} PLN
                  </>
                ) : (
                  <> Rooms total: {totalRoomPrice} PLN</>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="two-elements">
          <div className="left">
            Total: {hotelPrice + totalTransportPrice} PLN
          </div>
          <div className="right">
            <Button
              variant="secondary"
              className="button-style"
              onClick={handleReserve}
            >
              Reserve
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultDetailPage;
