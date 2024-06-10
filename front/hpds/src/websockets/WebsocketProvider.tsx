import { ReactNode, createContext, useContext, useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import GlobalContext, {
  GlobalContextType,
} from "../context/GlobalContextProvider";
import {
  HOTEL_OPTION_ENDPOINT,
  TRANSPORT_OPTION_ENDPOINT,
} from "../consts/consts";
import HotelResponseType from "../responesTypes/HotelResponseType";
import AxiosContext from "../axios/AxiosProvider";
import TransportOptionResponseType from "../responesTypes/TransportOptionResponseType";

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

  const addBoughtNotification = async (hotelId: string) => {
    try {
      const hotelResponse = await axiosInstance.get<HotelResponseType>(
        HOTEL_OPTION_ENDPOINT + `/${hotelId}`
      );
      // Update notifications here after fetching reservation
      setNotifications((prevNotifications) => [
        {
          message: `Someone has bought tour to hotel ${hotelResponse.data.name} in ${hotelResponse.data.city}`,
        },
        ...prevNotifications,
      ]);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const addReservedNotification = async (hotelId: string) => {
    try {
      const hotelResponse = await axiosInstance.get<HotelResponseType>(
        HOTEL_OPTION_ENDPOINT + `/${hotelId}`
      );
      // Update notifications here after fetching reservation
      setNotifications((prevNotifications) => [
        {
          message: `Someone has reserved tour to hotel ${hotelResponse.data.name} in ${hotelResponse.data.city}`,
        },
        ...prevNotifications,
      ]);
    } catch (err) {
      console.log(err);
    } finally {
    }
  };

  const addDiscountNotification = async (id: string) => {
    try {
      const response = await axiosInstance.get<HotelResponseType>(
        HOTEL_OPTION_ENDPOINT + `/${id}`
      );
      // it was discount for hotel
      setNotifications((prevNotifications) => [
        {
          message: `Discount added for hotel ${response.data.name} in ${response.data.city}`,
        },
        ...prevNotifications,
      ]);
    } catch (err) {
      // it was discount for transport option
      const response = await axiosInstance.get<TransportOptionResponseType>(
        TRANSPORT_OPTION_ENDPOINT + `/${id}`
      );
      setNotifications((prevNotifications) => [
        {
          message: `Discount added for transport from ${
            response.data.fromCity
          } to ${response.data.toCity} at ${response.data.start.split(".")[0]}`,
        },
        ...prevNotifications,
      ]);
    } finally {
    }
  };

  useEffect(() => {
    if (lastJsonMessageToursBought) {
      addBoughtNotification(lastJsonMessageToursBought.HotelId);
    }
  }, [lastJsonMessageToursBought]);

  useEffect(() => {
    if (lastJsonMessageToursReserved) {
      addReservedNotification(lastJsonMessageToursReserved.HotelId);
    }
  }, [lastJsonMessageToursReserved]);

  useEffect(() => {
    if (lastJsonMessageDiscounts) {
      addDiscountNotification(lastJsonMessageDiscounts.Id);
    }
  }, [lastJsonMessageDiscounts]);

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
