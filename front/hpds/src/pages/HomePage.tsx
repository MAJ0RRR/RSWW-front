import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Button from "react-bootstrap/Button";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";
import { useState, useEffect, useContext } from "react";
import { POPULAR_DESTINATIONS_ENDPOINT } from "../consts/consts";
import PopularDestinationResponseType from "../responesTypes/PopularDestinationResponseType";
import { useNavigate } from "react-router-dom";
import GlobalContext, {
  GlobalContextType,
} from "../context/GlobalContextProvider";

function HomePage() {
  const [popularDestinations, setPopularDestinations] = useState<
    PopularDestinationResponseType[]
  >([]);
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const { searchParams, setSearchParams, searchedParams, setSearchedParams } =
    useContext(GlobalContext) as GlobalContextType;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        const response = await axiosInstance.get<
          PopularDestinationResponseType[]
        >(POPULAR_DESTINATIONS_ENDPOINT);
        setPopularDestinations(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  return (
    <>
      <NavBar />
      <SearchBar />
      <div className="page-content">
        <div className="page-title">Popular directions</div>
        {loading && <div style={{ textAlign: "center" }}>Loading...</div>}
        {!loading &&
          popularDestinations.map((item) => (
            <div className="page-section-content">
              <div className="elements">
                <div className="left-50 font-size-36">{item.country}</div>
                <div className="right-50 font-size-36">
                  <Button
                    variant="secondary"
                    className="font-size-36"
                    onClick={() => {
                      setSearchParams({
                        ...searchParams,
                        ["country"]: item.country,
                      });
                      setSearchedParams({
                        ...searchParams,
                        ["country"]: item.country,
                      });
                      navigate("/searchresult");
                    }}
                  >
                    Check offers
                  </Button>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}

export default HomePage;
