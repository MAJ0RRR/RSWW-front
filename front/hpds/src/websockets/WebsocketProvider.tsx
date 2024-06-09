import { ReactNode, createContext, useContext, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import GlobalContext, {
  GlobalContextType,
} from "../context/GlobalContextProvider";
import ReservationResponseType from "../responesTypes/ReservationResponseType";
import { HOTEL_OPTION_ENDPOINT, RESERVATION_ENDPOINT } from "../consts/consts";
import HotelResponseType from "../responesTypes/HotelResponseType";
import AxiosContext from "../axios/AxiosProvider";

export interface WebsocketContextType {
  lastJsonMessageToursReserved: any;
  lastJsonMessageToursBought: any;
  lastJsonMessageDiscounts: any;
  readyStateToursReserved: ReadyState;
  readyStateToursBought: ReadyState;
  readyStateDiscounts: ReadyState;
}

const WebsocketContext = createContext<WebsocketContextType | null>(null);

export const WebsocketProvider = ({ children }: { children: ReactNode }) => {
  const { notifications, setNotifications } = useContext(
    GlobalContext
  ) as GlobalContextType;
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;

  const {
    lastJsonMessage: lastJsonMessageToursReserved,
    readyState: readyStateToursReserved,
  } = useWebSocket(`${window.location.origin}/ws/tours/reserved`, {
    share: false,
    shouldReconnect: () => true,
  });

  const {
    lastJsonMessage: lastJsonMessageToursBought,
    readyState: readyStateToursBought,
  } = useWebSocket(`${window.location.origin}/ws/tours/bought`, {
    share: false,
    shouldReconnect: () => true,
  });

  const {
    lastJsonMessage: lastJsonMessageDiscounts,
    readyState: readyStateDiscounts,
  } = useWebSocket(`${window.location.origin}/ws/discounts`, {
    share: false,
    shouldReconnect: () => true,
  });

  const addNotification = async (hotelId: string) => {
    try {
      const hotelResponse = await axiosInstance.get<HotelResponseType>(
        HOTEL_OPTION_ENDPOINT + `/${hotelId}`
      );
      // Update notifications here after fetching reservation
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        {
          message: `Someone has bought tour to hotel ${hotelResponse.data.name} in ${hotelResponse.data.city}`,
        },
      ]);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  useEffect(() => {
    if (lastJsonMessageToursBought) {
      addNotification(lastJsonMessageToursBought.HotelId);
    }
  }, [lastJsonMessageToursBought]);

  // Pass the required values to the provider
  return (
    <WebsocketContext.Provider
      value={{
        lastJsonMessageToursReserved,
        lastJsonMessageToursBought,
        lastJsonMessageDiscounts,
        readyStateToursReserved,
        readyStateToursBought,
        readyStateDiscounts,
      }}
    >
      {children}
    </WebsocketContext.Provider>
  );
};

export default WebsocketContext;
