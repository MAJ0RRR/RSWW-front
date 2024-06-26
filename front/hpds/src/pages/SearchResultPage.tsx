import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import TourResponseType from "../responesTypes/TourResponseType";
import { TOURS_ENDPOINT } from "../consts/consts";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";
import GlobalContext, {
  GlobalContextType,
} from "../context/GlobalContextProvider";
import ToursGet from "../requestsTypes/ToursGet";
import Notifications from "../components/Notifications";

function SearchResultPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const {
    searchParams,
    setSearchParams,
    searchedParams,
    setSearchedParams,
    selectedTour,
    setSelectedTour,
    notifications,
    setNotifications,
  } = useContext(GlobalContext) as GlobalContextType;
  const [tours, setTours] = useState<TourResponseType[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        const dataToSend = {
          numberOfPeople:
            searchedParams.adults +
            searchedParams.upTo3 +
            searchedParams.upTo10 +
            searchedParams.upTo18,
          fromCity: searchedParams.fromCity,
          fromCountry: searchedParams.fromCountry,
          toCountry: searchedParams.country,
          toCity: searchedParams.city,
          minStart: searchedParams.whenFrom,
          maxEnd: searchedParams.whenTo,
          minDuration: searchedParams.howLongFrom,
          maxDuration: searchedParams.howLongTo,
          typeOfTransport: searchedParams.typeOfTransport,
        } as ToursGet;
        setSearchParams({
          ...searchParams,
          ["country"]: "",
          ["city"]: "",
          ["whenFrom"]: "",
          ["whenTo"]: "",
          ["howLongFrom"]: 7,
          ["howLongTo"]: 10,
          ["fromCity"]: "",
          ["fromCountry"]: "",
          ["typeOfTransport"]: "",
          ["adults"]: 2,
          ["upTo3"]: 0,
          ["upTo10"]: 0,
          ["upTo18"]: 0,
        });
        const response = await axiosInstance.get<TourResponseType[]>(
          TOURS_ENDPOINT,
          { params: dataToSend }
        );
        setTours(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchTours();
  }, [searchedParams]);

  return (
    <>
      <NavBar />
      <div className="main-container">
        <div className="main-content">
          <SearchBar />
          <div className="page-content">
            <div className="page-title">Holidays {searchedParams.country}</div>
            {error && (
              <div style={{ textAlign: "center", color: "red" }}>
                Error: {error}
              </div>
            )}
            {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
            {!loading && tours.length === 0 && (
              <div style={{ textAlign: "center" }}>No results</div>
            )}
            {!loading &&
              tours.length > 0 &&
              tours.map((item) => (
                <div className="page-section-content">
                  <div className="elements">
                    <div className="left-50 font-size-36">{item.hotelName}</div>
                  </div>
                  <div className="elements">
                    <div className="left-50">
                      Address: {item.hotelCity}
                      <br />
                      Transport: {item.typeOfTransport} from {item.fromCity}
                      <br />
                      Date: {item.dateTime}
                      <br />
                      Duration: {item.numberOfNights}
                      <br />
                    </div>
                    <div className="right-50-relative">
                      <div className="bottom-right">
                        <Button
                          variant="secondary"
                          className="button-style"
                          onClick={() => {
                            setSelectedTour(item);
                            navigate("/resultdetail");
                          }}
                        >
                          Check offer
                        </Button>
                      </div>
                    </div>
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

export default SearchResultPage;
