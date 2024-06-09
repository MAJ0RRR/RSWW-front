import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";
import { useState, useEffect, useContext } from "react";
import {
  POPULAR_HOTELS,
  POPULAR_TRANSPORT_DESTINATIONS,
  POPULAR_TRANSPORT_TYPES_ENDPOINT,
  RESERVATION_ENDPOINT,
} from "../consts/consts";
import GlobalContext, {
  GlobalContextType,
} from "../context/GlobalContextProvider";
import Notifications from "../components/Notifications";
import WebsocketContext, {
  WebsocketContextType,
} from "../websockets/WebsocketProvider";
import PopularHotelResponseType from "../responesTypes/PopularHotelResponseType";
import PopularTransportDestinationsResponseType from "../responesTypes/PopularTransportDestinationsResponseType";
import ReservationResponseType from "../responesTypes/ReservationResponseType";

function HomePage() {
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const { notifications, setNotifications } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { lastJsonMessageToursBought, lastJsonMessageToursReserved } =
    useContext(WebsocketContext) as WebsocketContextType;
  const [popularTransportTypes, setPopularTransportTypes] = useState<string[]>(
    []
  );
  const [popularHotels, setPopularHotels] = useState<
    PopularHotelResponseType[]
  >([]);
  const [popularTransportDestinations, setPopularTransportDestinations] =
    useState<PopularTransportDestinationsResponseType[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  const fetchPopularThings = async () => {
    try {
      // get popular transport types
      const response = await axiosInstance.get<string[]>(
        POPULAR_TRANSPORT_TYPES_ENDPOINT
      );
      setPopularTransportTypes(response.data);

      // get popular hotels
      const response1 = await axiosInstance.get<PopularHotelResponseType[]>(
        POPULAR_HOTELS
      );
      setPopularHotels(response1.data);

      //get popular transport destinations
      const response2 = await axiosInstance.get<
        PopularTransportDestinationsResponseType[]
      >(POPULAR_TRANSPORT_DESTINATIONS);
      setPopularTransportDestinations(response2.data);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  const fetchReservation = async (reservationId: string) => {
    try {
      if (
        notifications.some((notification) => notification.key === reservationId)
      ) {
        return;
      }
      const reservationResponse =
        await axiosInstance.get<ReservationResponseType>(
          RESERVATION_ENDPOINT + `/${reservationId}`
        );
      // Update notifications here after fetching reservation
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          key: reservationId,
          message: `Someone has bought tour to hotel ${reservationResponse.data.hotelName} in ${reservationResponse.data.hotelCity}`,
        },
      ]);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPopularThings();
  }, [lastJsonMessageToursReserved]);

  useEffect(() => {
    if (lastJsonMessageToursBought) {
      fetchReservation(lastJsonMessageToursBought.ReservatonId);
    }
  }, [lastJsonMessageToursBought]);

  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="main-content">
          <SearchBar />
          <div className="page-content">
            {error && (
              <div style={{ textAlign: "center", color: "red" }}>
                Error: {error}
              </div>
            )}
            <div className="page-title">Popular transport destinations</div>
            {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
            {!loading &&
              Object.keys(popularTransportDestinations).map((country) =>
                popularTransportDestinations[country].map((city) => (
                  <div className="page-section-content">
                    <div className="elements">
                      <div className="font-size-36">
                        {city} - {country}
                      </div>
                    </div>
                  </div>
                ))
              )}
            <div className="page-title" style={{ marginTop: "30px" }}>
              Popular hotels
            </div>
            {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
            {!loading &&
              popularHotels.map((item) => (
                <div className="page-section-content">
                  <div className="elements">
                    <div className="font-size-36">
                      {item.item3} - {item.item2} - {item.item1}
                    </div>
                  </div>
                </div>
              ))}
            <div className="page-title" style={{ marginTop: "30px" }}>
              Popular transport types
            </div>
            {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
            {!loading &&
              popularTransportTypes.map((item) => (
                <div className="page-section-content">
                  <div className="elements">
                    <div className="font-size-36">{item}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        <Notifications notificationsList={notifications} />
      </div>
    </>
  );
}

export default HomePage;
