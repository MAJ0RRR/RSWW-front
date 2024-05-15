import "../styles/SearchStyles.css";
import "rsuite/dist/rsuite.min.css";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import { useState } from "react";
import { DateRangePicker } from "rsuite";
import { InputPicker } from "rsuite";
import { SelectPicker } from "rsuite";
import { InputNumber } from "rsuite";

function SearchBar() {
  // variables
  const [seachBarData, setSearchBarData] = useState({
    country: "",
    city: "",
    whenFrom: "",
    whenTo: "",
    howLongFrom: 7,
    howLongTo: 10,
    from: "",
    typeOfTransport: "",
    adults: 2,
    upTo3: 0,
    upTo10: 0,
    upTo18: 0,
  });
  const possibleTypesOfTransport = ["Plane", "Bus", "Own"].map((item) => ({
    label: item,
    value: item,
  }));

  // handlers
  const handleDateRangePickerChange = (e) => {
    console.log(e);
    setSearchBarData({ ...seachBarData, ["whenFrom"]: e[0], ["whenTo"]: e[1] });
  };
  const handleChange = (e, name: string) => {
    const value = parseInt(e);
    if (value) {
      setSearchBarData({ ...seachBarData, [name]: value });
    } else {
      setSearchBarData({ ...seachBarData, [name]: 0 });
    }
  };
  const handleSearch = () => {
    console.log(seachBarData);
  };

  // mock data
  const mocked_countries = ["Country1", "Country2", "Country3", "Country4"].map(
    (item) => ({ label: item, value: item })
  );
  const mocked_cities = ["City1", "City2", "City3", "City4"].map((item) => ({
    label: item,
    value: item,
  }));
  const mocked_from = ["City1", "City2", "City3", "City4"].map((item) => ({
    label: item,
    value: item,
  }));

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
                  data={mocked_countries}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchBarData({ ...seachBarData, ["country"]: e })
                  }
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">City:</label>
                <br />
                <SelectPicker
                  data={mocked_cities}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchBarData({ ...seachBarData, ["city"]: e })
                  }
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">When:</label>
                <br />
                <DateRangePicker
                  format="dd.MM.yyyy"
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
                    {seachBarData.howLongFrom} - {seachBarData.howLongTo}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="list-item">
                      <label>From:</label>
                      <br />
                      <InputNumber
                        min={0}
                        defaultValue={seachBarData.howLongFrom}
                        max={30}
                        onChange={(e) => handleChange(e, "howLongFrom")}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item className="list-item">
                      <label>To:</label>
                      <br />
                      <InputNumber
                        min={0}
                        defaultValue={seachBarData.howLongTo}
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
                <label htmlFor="inputField1">From:</label>
                <br />
                <SelectPicker
                  data={mocked_from}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchBarData({ ...seachBarData, ["from"]: e })
                  }
                />
              </div>
              <div className="search-input-field">
                <label htmlFor="inputField1">Type of transport:</label>
                <br />
                <InputPicker
                  data={possibleTypesOfTransport}
                  style={{ width: 200 }}
                  onChange={(e) =>
                    setSearchBarData({
                      ...seachBarData,
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
                    {seachBarData.adults} + {seachBarData.upTo3} +{" "}
                    {seachBarData.upTo10} + {seachBarData.upTo18}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item className="list-item">
                      <label>Adults:</label>
                      <br />
                      <InputNumber
                        min={0}
                        defaultValue={seachBarData.adults}
                        max={20}
                        onChange={(e) => handleChange(e, "adults")}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item className="list-item">
                      <label>Up to 3:</label>
                      <br />
                      <InputNumber
                        min={0}
                        defaultValue={seachBarData.upTo3}
                        max={20}
                        onChange={(e) => handleChange(e, "upTo3")}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item className="list-item">
                      <label>Up to 10:</label>
                      <br />
                      <InputNumber
                        min={0}
                        defaultValue={seachBarData.upTo10}
                        max={20}
                        onChange={(e) => handleChange(e, "upTo10")}
                      />
                    </Dropdown.Item>
                    <Dropdown.Item className="list-item">
                      <label>Up to 18:</label>
                      <br />
                      <InputNumber
                        min={0}
                        defaultValue={seachBarData.upTo18}
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
