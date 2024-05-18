import NavBar from "../components/NavBar";
import SearchBar from "../components/SearchBar";
import Button from "react-bootstrap/Button";
import { AxiosContextType } from "../axios/AxiosProvider";
import AxiosContext from "../axios/AxiosProvider";
import React, { useState, useEffect, useContext } from "react";
import { POPULAR_DESTINATIONS_ENDPOINT } from "../consts/consts";

function HomePage() {
  const [popularDestinations, setPopularDestinations] = useState([]);
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPopularDestinations = async () => {
      try {
        const response = await axiosInstance.get(
          `${POPULAR_DESTINATIONS_ENDPOINT}`
        );
        setPopularDestinations(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPopularDestinations();
  }, []);

  if (error) return <div>Something went wrong: {error.message}</div>;

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
                  <Button variant="secondary" className="font-size-36">
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
