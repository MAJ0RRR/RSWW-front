import NavBarLoggedIn from "../components/NavBarLoggedIn";
import "../styles/ReservationPageStyles.css";
import Button from "react-bootstrap/Button";

function ReservationPage() {
  //mocked vairables
  const page_status = "noPayment";

  return (
    <>
      <NavBarLoggedIn />
      <div className="page-content">
        <div className="page-title">Trip to Hotel Gołebiewski</div>
        <div className="page-section">
          <div className="page-section-title">General info</div>
          <div className="page-section-content">
            <div className="page-section-content-title">Date</div>
            <div className="page-section-content-content">
              Start: 2023-01-01 <br />
              End: 2023-01-01
            </div>
          </div>
          <div className="page-section-content">
            <div className="page-section-content-title">
              People configuration
            </div>
            <div className="page-section-content-content">
              Adult: 12 <br />
              Adult: 12 <br />
              Adult: 12 <br />
              Adult: 12 <br />
            </div>
          </div>
        </div>
        <div className="page-section">
          <div className="two-elements">
            <div className="left">
              <div className="page-section-title">Transport</div>
            </div>
            <div className="right">31231 PLN</div>
          </div>
          <div className="page-section-content">
            <div className="page-section-content-title">
              From Berlin to Gdańsk
            </div>
            <div className="page-section-content-content">
              Param: 2023-01-01 <br />
              Param: 2023-01-01 <br />
              Param: 2023-01-01 <br />
              Param: 2023-01-01 <br />
              Param: 2023-01-01
            </div>
          </div>
          <div className="page-section-content">
            <div className="page-section-content-title">
              From Gdańsk to Berlin
            </div>
            <div className="page-section-content-content">
              Param: 2023-01-01 <br />
              Param: 2023-01-01 <br />
              Param: 2023-01-01 <br />
              Param: 2023-01-01 <br />
              Param: 2023-01-01
            </div>
          </div>
        </div>
        <div className="page-section">
          <div className="two-elements">
            <div className="left">
              <div className="page-section-title">Hotel</div>
            </div>
            <div className="right">31231 PLN</div>
          </div>
          <div className="page-section-content">
            <div className="page-section-content-title">Details</div>
            <div className="page-section-content-content">
              Param: 2023-01-01 <br />
              Param: 2023-01-01 <br />
              Param: 2023-01-01
            </div>
          </div>
          <div className="page-section-content">
            <div className="page-section-content-title">Configuration</div>
            <div className="page-section-content-content">
              <div className="user-input">
                <div className="left">
                  <label htmlFor="food">Food</label>
                </div>
                <div className="right">
                  220 PLN (per night)
                  <input type="checkbox" name="food"></input>
                </div>
              </div>
              <div className="user-input-result-one">
                Rooms total: 220 PLN(per night) x 4 nights = 880 PLN
              </div>
              <div className="page-section-content-title">
                Room configuration
              </div>
              <div className="user-input">
                <div className="left">
                  <label htmlFor="room_size_1">Size 1</label>
                </div>
                <div className="right">
                  220 PLN (per night)
                  <input type="text" name="room_size_1"></input>
                </div>
              </div>
              <div className="user-input">
                <div className="left">
                  <label htmlFor="room_size_2">Size 2</label>
                </div>
                <div className="right">
                  300 PLN (per night)
                  <input type="text" name="room_size_2"></input>
                </div>
              </div>
              <div className="user-input">
                <div className="left">
                  <label htmlFor="room_size_3">Size 3</label>
                </div>
                <div className="right">
                  420 PLN (per night)
                  <input type="text" name="room_size_3"></input>
                </div>
              </div>
              <div className="user-input-result-two">
                <div className="user-input-result-two-left">
                  Rooms capacity: 6/6
                </div>
                <div className="user-input-result-two-right">
                  Rooms total: 640 PLN(per night) x 4 nights = 2560 PLN
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="two-elements">
          <div className="left">Total: 1231231 PLN</div>
          <div className="right">
            {page_status === "toBuy" && (
              <>
                Time left: 00:00
                <Button variant="secondary" className="button-style">
                  Buy
                </Button>
              </>
            )}
            {page_status === "paymentDone" && (
              <span style={{ color: "green" }}>Paid</span>
            )}
            {page_status === "noPayment" && (
              <span style={{ color: "red" }}>No payment</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ReservationPage;
