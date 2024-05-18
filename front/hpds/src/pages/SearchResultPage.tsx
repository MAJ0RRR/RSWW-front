import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Button from "react-bootstrap/Button";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import SearchParams from "../requestsTypes/SearchParams";
import TourResponseType from "../responesTypes/TourResponseType";
import { TOURS_ENDPOINT } from "../consts/consts";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";

function SearchResultPage() {
  const location = useLocation();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const [searchParams, setSearchParams] = useState(
    location.state.searchParams as SearchParams
  );
  const [tours, setTours] = useState<TourResponseType[]>([]);

  useEffect(() => {
    const fetchTours = async () => {
      try {
        setLoading(true);
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
  }, [location.state.searchParams]);

  return (
    <>
      <NavBar />
      <SearchBar
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />
      <div className="page-content">
        <div className="page-title">Holidays TODO</div>
        {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
        {!loading && //TODO serve empty tours
          tours.map((item) => (
            <div className="page-section-content">
              <div className="elements">
                <div className="left-50 font-size-36">{item.hotel}</div>
                <div className="right-50 font-size-36">TODO PLN</div>
              </div>
              <div className="elements">
                <div className="left-50">
                  Address: {item.fromCity}
                  <br />
                  Transport: {item.transportType} from {item.fromCity}
                  <br />
                  Date: {item.startDate}
                  <br />
                  Duration: {item.durationDays}
                  <br />
                </div>
                <div className="right-50-relative">
                  <div className="bottom-right">
                    <Button variant="secondary" className="button-style">
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
