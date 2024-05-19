import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Button from "react-bootstrap/Button";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import TourResponseType from "../responesTypes/TourResponseType";
import { TOURS_ENDPOINT } from "../consts/consts";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";
import GlobalContext, {
  GlobalContextType,
} from "../context/GlobalContextProvider";

function SearchResultPage() {
  const location = useLocation();
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
  } = useContext(GlobalContext) as GlobalContextType;
  const [tours, setTours] = useState<TourResponseType[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      console.log("USEEFECT WORKED");
      try {
        const response = await axiosInstance.get<TourResponseType[]>(
          TOURS_ENDPOINT,
          { params: searchParams }
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
      <SearchBar />
      <div className="page-content">
        <div className="page-title">Holidays {searchedParams.country}</div>
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
                <div className="right-50 font-size-36">TODO PLN</div>
              </div>
              <div className="elements">
                <div className="left-50">
                  Address: {item.fromCity}
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
    </>
  );
}

export default SearchResultPage;
