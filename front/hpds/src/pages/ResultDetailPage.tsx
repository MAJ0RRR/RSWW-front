import NavBar from "../components/NavBar";
import "../styles/ReservationPageStyles.css";
import "rsuite/dist/rsuite.min.css";
import Button from "react-bootstrap/Button";
import { InputNumber } from "rsuite";
import { Checkbox } from "rsuite";
import { useState, useEffect } from "react";
import { useContext } from "react";
import AuthContext, { AuthContextType } from "../context/AuthProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";
import TransportOptionResponseType from "../responesTypes/TransportOptionResponseType";
import {
  HOTEL_OPTION_ENDPOINT,
  TRANSPORT_OPTION_ENDPOINT,
  RESERVATION_ENDPOINT,
} from "../consts/consts";
import HotelResponseType from "../responesTypes/HotelResponseType";
import GlobalContext, {
  GlobalContextType,
} from "../context/GlobalContextProvider";
import HotelRoomsAvailabiltyResponseType from "../responesTypes/HotelRoomsAvailabilityResponseType";
import ReservationPost from "../requestsTypes/ReservationPost";

function ResultDetailPage() {
  const { auth } = useContext(AuthContext) as AuthContextType;
  const location = useLocation();
  const navigate = useNavigate();
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const {
    searchedParams,
    setSearchedParams,
    selectedTour,
    setSelectedTour,
    checkedRooms,
    setCheckedRooms,
    foodIncluded,
    setFoodIncluded,
    totalRoomPriceString,
    setTotalRoomPriceString,
    totalRoomPrice,
    setTotalRoomPrice,
    roomPrices,
    setRoomPrices,
  } = useContext(GlobalContext) as GlobalContextType;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

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
    rooms: [{ price: 0, size: 2, count: 2 }],
  });
  const [hotelAvailableRooms, setHotelAvailableRooms] =
    useState<HotelRoomsAvailabiltyResponseType>({ rooms: [] });

  // get state information
  const tour = selectedTour;
  const numberOfAdults = searchedParams.adults;
  const numberOfUnder3 = searchedParams.upTo3;
  const numberOfUnder10 = searchedParams.upTo10;
  const numberOfUnder18 = searchedParams.upTo18;
  const numberOfNights = selectedTour.numberOfNights;

  // get transportOptionInfo and hotelOptionInfo
  useEffect(() => {
    const fetchTourDetails = async () => {
      try {
        // transportOptionFrom
        const response1 = await axiosInstance.get<TransportOptionResponseType>(
          TRANSPORT_OPTION_ENDPOINT + `/${tour.fromHotelTransportOptionId}`,
          {
            params: {
              fromTimeStamp: tour.dateTime,
            },
          }
        );
        setFromHotelTransportOption(response1.data);

        // transportOptionTo
        const response2 = await axiosInstance.get<TransportOptionResponseType>(
          TRANSPORT_OPTION_ENDPOINT + `/${tour.toHotelTransportOptionId}`,
          {
            params: {
              fromTimeStamp: tour.dateTime,
            },
          }
        );
        setToHotelTransportOption(response2.data);

        // hotelInfo
        const response3 = await axiosInstance.get<HotelResponseType>(
          HOTEL_OPTION_ENDPOINT + `/${tour.hotelId}`,
          {
            params: {
              fromTimeStamp: tour.dateTime,
            },
          }
        );
        setHotel(response3.data);

        //hotel available rooms
        const response4 =
          await axiosInstance.get<HotelRoomsAvailabiltyResponseType>(
            HOTEL_OPTION_ENDPOINT + `/${tour.hotelId}` + "/RoomsAvailability",
            {
              params: {
                Start: response2.data.end.split("T")[0],
                End: response1.data.start.split("T")[0],
              },
            }
          );
        setHotelAvailableRooms(response4.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTourDetails();
  }, [selectedTour]);

  if (error) {
    return (
      <>
        <NavBar />
        <div className="page-content">Something went wrong</div>
      </>
    );
  }

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

  const totalFoodPrice = foodIncluded
    ? hotel.foodPricePerPerson * totalPeople * numberOfNights
    : 0;

  const hotelPrice = totalFoodPrice + totalRoomPrice;

  const handleRoomChange = (size: number, count: number, price: number) => {
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
    setTotalRoomPrice(newTotalRoomPrice * numberOfNights);
    const newString =
      newCheckedRooms
        .map((room) => `${room.total / room.count} PLN * ${room.count}`)
        .join(" + ") +
        ")" +
        ` * ${numberOfNights} nights` || "";
    setTotalRoomPriceString("(" + newString);
  };
  const handleReserve = async () => {
    if (!auth.is_logged_in) {
      navigate("/login", { state: { from: window.location.pathname } });
    } else {
      try {
        const dataToSend = {
          toHotelTransportOptionId: toHotelTransportOption.id,
          fromHotelTransportOptionId: fromHotelTransportOption.id,
          hotelId: hotel.id,
          numberOfAdults: numberOfAdults,
          numberOfUnder3: numberOfUnder3,
          numberOfUnder10: numberOfUnder10,
          numberOfUnder18: numberOfUnder18,
          foodIncluded: foodIncluded,
          rooms: checkedRooms
            .filter((item) => item.count > 0)
            .map((item) => ({ size: item.size, number: item.count })),
        } as ReservationPost;
        const response = await axiosInstance.post(RESERVATION_ENDPOINT, {
          ...dataToSend,
        });
        if (response.status === 400) {
          navigate("/");
        } else {
          navigate(`/reservation/${response.data.id}`);
        }
      } catch (err) {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <NavBar />
      <div className="page-content">
        <div className="page-title">Trip to {hotel?.name}</div>
        <div className="page-section">
          <div className="page-section-title">General info</div>
          <div className="page-section-content">
            <div className="page-section-content-title">Date</div>
            <div className="page-section-content-content">
              Start: {toHotelTransportOption?.start} <br />
              End: {fromHotelTransportOption?.end}
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
          {tour.typeOfTransport === "Own" ? (
            <>
              <div className="page-section-content">
                <div className="two-elements">
                  <div className="left">
                    <div className="page-section-content-title">
                      Own transport
                    </div>
                  </div>
                  <div className="right page-section-content-title">
                    {transportFromPrice} PLN
                  </div>
                </div>
                <div className="page-section-content-content">
                  Buyer is responsible for organizing transport on his own.
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="page-section-content">
                <div className="two-elements">
                  <div className="left">
                    <div className="page-section-content-title">
                      From {toHotelTransportOption?.fromCity} to{" "}
                      {toHotelTransportOption?.toCity}
                    </div>
                  </div>
                  <div className="right page-section-content-title">
                    {transportFromPrice} PLN
                  </div>
                </div>
                <div className="page-section-content-content">
                  Transport type: {toHotelTransportOption?.type} <br />
                  From: {toHotelTransportOption?.fromShowName} <br />
                  To: {toHotelTransportOption?.toShowName} <br />
                  Start date: {toHotelTransportOption?.start} <br />
                  End date: {toHotelTransportOption?.end}
                </div>
              </div>
              <div className="page-section-content">
                <div className="two-elements">
                  <div className="left">
                    <div className="page-section-content-title">
                      From {fromHotelTransportOption?.fromCity} to{" "}
                      {fromHotelTransportOption?.toCity}
                    </div>
                  </div>
                  <div className="right page-section-content-title">
                    {transportToPrice} PLN
                  </div>
                </div>
                <div className="page-section-content-content">
                  Transport type: {fromHotelTransportOption?.type} <br />
                  From: {fromHotelTransportOption?.fromShowName} <br />
                  To: {fromHotelTransportOption?.toShowName} <br />
                  Start date: {fromHotelTransportOption?.start} <br />
                  End date: {fromHotelTransportOption?.end}
                </div>
              </div>
            </>
          )}
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
              Name: {hotel?.name} <br />
              Country: {hotel?.country} <br />
              Address: {hotel?.street}, {hotel?.city}, {hotel?.country}
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
                    checked={foodIncluded}
                    onChange={(value: any, checked: boolean, event) =>
                      checked
                        ? setFoodIncluded(true)
                        : setFoodIncluded(false)
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
              {hotelAvailableRooms.rooms.map((item) => (
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
                        defaultValue={
                          checkedRooms
                            ? checkedRooms.find(
                                (checkedRoom) => checkedRoom.size == item.size
                              )?.count
                            : 0
                        }
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
            {error ? (
              <div>
                You cannot reserve, because there are no available resources.
              </div>
            ) : (
              <>
                <Button
                  variant="secondary"
                  className="button-style"
                  onClick={handleReserve}
                >
                  Reserve
                </Button>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ResultDetailPage;
