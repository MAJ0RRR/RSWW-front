import { ReactNode, createContext, useState } from "react";
import SearchParams from "../requestsTypes/SearchParams";
import TourResponseType from "../responesTypes/TourResponseType";
import CheckedRoomsType from "../generalTypes/generalTypes";

export interface GlobalContextType {
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
  searchedParams: SearchParams;
  setSearchedParams: (searchedParams: SearchParams) => void;
  selectedTour: TourResponseType;
  setSelectedTour: (selectedTour: TourResponseType) => void;
  checkedRooms: CheckedRoomsType[];
  setCheckedRooms: (checkedRooms: CheckedRoomsType[]) => void;
  foodIncluded: boolean;
  setFoodIncluded: (foodIncluded: boolean) => void;
  totalRoomPriceString: string;
  setTotalRoomPriceString: (totalRoomPriceString: string) => void;
  totalRoomPrice: number;
  setTotalRoomPrice: (totalRoomPrice: number) => void;
  roomPrices: Record<number, number>;
  setRoomPrices: (roomPrices: Record<number, number>) => void;
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
  const [checkedRooms, setCheckedRooms] = useState<CheckedRoomsType[]>([]);
  const [foodIncluded, setFoodIncluded] = useState<boolean>(false);
  const [totalRoomPriceString, setTotalRoomPriceString] = useState<string>("");
  const [totalRoomPrice, setTotalRoomPrice] = useState<number>(0);
  const [roomPrices, setRoomPrices] = useState<Record<number, number>>({});

  return (
    <GlobalContext.Provider
      value={{
        searchParams,
        setSearchParams,
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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
