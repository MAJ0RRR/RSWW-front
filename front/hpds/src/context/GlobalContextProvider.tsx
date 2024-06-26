import { ReactNode, createContext, useState } from "react";
import SearchParams from "../requestsTypes/SearchParams";
import TourResponseType from "../responesTypes/TourResponseType";
import NotificationList from "../generalTypes/notificationListType";

export interface GlobalContextType {
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
  searchedParams: SearchParams;
  setSearchedParams: (searchedParams: SearchParams) => void;
  selectedTour: TourResponseType;
  setSelectedTour: (selectedTour: TourResponseType) => void;
  notifications: NotificationList[];
  setNotifications: (notifications: NotificationList[]) => void;
}

const GlobalContext = createContext<GlobalContextType | null>(null);

export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    country: "",
    city: "",
    whenFrom: "",
    whenTo: "",
    howLongFrom: 7,
    howLongTo: 10,
    fromCity: "",
    fromCountry: "",
    typeOfTransport: "",
    adults: 2,
    upTo3: 0,
    upTo10: 0,
    upTo18: 0,
  });
  const [searchedParams, setSearchedParams] = useState<SearchParams>({
    country: "",
    city: "",
    whenFrom: "",
    whenTo: "",
    howLongFrom: 7,
    howLongTo: 10,
    fromCity: "",
    fromCountry: "",
    typeOfTransport: "",
    adults: 2,
    upTo3: 0,
    upTo10: 0,
    upTo18: 0,
  });
  const [selectedTour, setSelectedTour] = useState<TourResponseType>({
    toHotelTransportOptionId: "",
    fromHotelTransportOptionId: "",
    hotelId: "",
    fromCity: "",
    hotelName: "",
    hotelCity: "",
    typeOfTransport: "",
    dateTime: "",
    numberOfNights: 0,
  });
  const [notifications, setNotifications] = useState<NotificationList[]>([]);

  return (
    <GlobalContext.Provider
      value={{
        searchParams,
        setSearchParams,
        searchedParams,
        setSearchedParams,
        selectedTour,
        setSelectedTour,
        notifications,
        setNotifications,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
