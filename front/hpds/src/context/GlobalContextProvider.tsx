import { ReactNode, createContext, useState } from "react";
import SearchParams from "../requestsTypes/SearchParams";

export interface GlobalContextType {
  searchParams: SearchParams;
  setSearchParams: (searchParams: SearchParams) => void;
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
    whenFrom: null,
    whenTo: null,
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

  return (
    <GlobalContext.Provider value={{ searchParams, setSearchParams }}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
