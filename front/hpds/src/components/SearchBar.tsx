import "../styles/SearchStyles.css";
import "rsuite/dist/rsuite.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { DateRangePicker } from "rsuite";
import { InputPicker } from "rsuite";
import { SelectPicker } from "rsuite";
import { InputNumber } from "rsuite";
import { useNavigate } from "react-router-dom";
import { AVAILABLE_DESTINATIONS_ENDPOINT } from "../consts/consts";
import { useContext, useEffect, useState } from "react";
import GlobalContext, {
  GlobalContextType,
} from "../context/GlobalContextProvider";
import AvailableDestinationsResponseType from "../responesTypes/AvailableDestinationsResponseType";
import AxiosContext, { AxiosContextType } from "../axios/AxiosProvider";

function SearchBar() {
  // variables
  const navigate = useNavigate();
  const { axiosInstance } = useContext(AxiosContext) as AxiosContextType;
  const { searchParams, setSearchParams, searchedParams, setSearchedParams } =
    useContext(GlobalContext) as GlobalContextType;
  const [availableDestinations, setAvailableDestinations] = useState<
    AvailableDestinationsResponseType[]
  >([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [dateRange, setDateRange] = useState<Date[]>(["", ""]);

  const possibleTypesOfTransport = ["Plane", "Bus", "Train"].map((item) => ({
    label: item,
    value: item,
  }));

  // handlers
  const handleDateRangePickerChange = (e) => {
    setSearchParams({ ...searchParams, ["whenFrom"]: e[0], ["whenTo"]: e[1] });
  };
  const handleChange = (e, name: string) => {
    const value = parseInt(e);
    if (value) {
      setSearchParams({ ...searchParams, [name]: value });
    } else {
      setSearchParams({ ...searchParams, [name]: 0 });
    }
  };

  const handleSearch = () => {
    setSearchedParams({
      ...searchParams,
    });
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
    navigate("/searchresult");
  };

  // search data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get<
          AvailableDestinationsResponseType[]
        >(AVAILABLE_DESTINATIONS_ENDPOINT);
        setAvailableDestinations(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Convert searchParams.whenFrom and searchParams.whenTo to Date objects
    const fromDate = new Date(searchParams.whenFrom);
    const toDate = new Date(searchParams.whenTo);

    // Update the date range state
    setDateRange([fromDate, toDate]);
  }, [searchParams]);

  const countries = availableDestinations.map((item) => ({
    label: item.country,
    value: item.country,
  }));

  const cities = availableDestinations.reduce((acc, curr) => {
    const cityObjects = curr.cities.map(city => ({ label: city, value: city }));
    return [...acc, ...cityObjects];
  }, []);

  return (
    <div className="page-content">
      <div className="elements">
        <div className="left-80">
          <div className="search-container">
            <div className="search-input-group">
              <div className="search-input-field">
                <label htmlFor="inputField1">Country:</label>
                <br />
                <SelectPicker
                  data={countries}
                  value={searchParams.country}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, ["country"]: e })
                  }
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">City:</label>
                <br />
                <SelectPicker
                  data={cities}
                  value={searchParams.city}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, ["city"]: e })
                  }
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">When:</label>
                <br />
                <DateRangePicker
                  format="dd.MM.yyyy"
                  value={dateRange}
                  character=" - "
                  onChange={handleDateRangePickerChange}
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">How long:</label>
                <br />
                <Dropdown autoClose="outside">
                  <Dropdown.Toggle
                    variant="not"
                    id="dropdown-basic"
                    className="dropdown-button"
                  >
                    {searchParams.howLongFrom} - {searchParams.howLongTo}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="list-item">
                      <label>From:</label>
                      <br />
                      <InputNumber
                        min={0}
                        value={searchParams.howLongFrom}
                        max={30}
                        onChange={(e) => handleChange(e, "howLongFrom")}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item className="list-item">
                      <label>To:</label>
                      <br />
                      <InputNumber
                        min={0}
                        value={searchParams.howLongTo}
                        max={30}
                        onChange={(e) => handleChange(e, "howLongTo")}
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="search-input-group">
              <div className="search-input-field">
                <label htmlFor="inputField1">From Country:</label>
                <br />
                <SelectPicker
                  data={countries}
                  value={searchParams.fromCountry}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, ["fromCountry"]: e })
                  }
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">From City:</label>
                <br />
                <SelectPicker
                  data={cities}
                  value={searchParams.fromCity}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchParams({ ...searchParams, ["fromCity"]: e })
                  }
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">Type of transport:</label>
                <br />
                <InputPicker
                  data={possibleTypesOfTransport}
                  value={searchParams.typeOfTransport}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchParams({
                      ...searchParams,
                      ["typeOfTransport"]: e,
                    })
                  }
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">People:</label>
                <br />
                <Dropdown autoClose="outside">
                  <Dropdown.Toggle
                    variant="not"
                    id="dropdown-basic"
                    className="dropdown-button"
                  >
                    {searchParams.adults} + {searchParams.upTo3} +{" "}
                    {searchParams.upTo10} + {searchParams.upTo18}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="list-item">
                      <label>Adults:</label>
                      <br />
                      <InputNumber
                        min={0}
                        value={searchParams.adults}
                        max={20}
                        onChange={(e) => handleChange(e, "adults")}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item className="list-item">
                      <label>Up to 3:</label>
                      <br />
                      <InputNumber
                        min={0}
                        value={searchParams.upTo3}
                        max={20}
                        onChange={(e) => handleChange(e, "upTo3")}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item className="list-item">
                      <label>Up to 10:</label>
                      <br />
                      <InputNumber
                        min={0}
                        value={searchParams.upTo10}
                        max={20}
                        onChange={(e) => handleChange(e, "upTo10")}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item className="list-item">
                      <label>Up to 18:</label>
                      <br />
                      <InputNumber
                        min={0}
                        value={searchParams.upTo18}
                        max={20}
                        onChange={(e) => handleChange(e, "upTo18")}
                      />
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          </div>
        </div>
        <div className="right-20-relative">
          <div className="bottom-right">
            <Button
              variant="secondary"
              className="font-size-36"
              onClick={handleSearch}
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
