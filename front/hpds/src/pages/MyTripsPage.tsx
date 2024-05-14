import NavBarLoggedIn from "../components/NavBarLoggedIn";
import "../styles/MyTripPageStyles.css";
import Button from "react-bootstrap/Button";

function MyTripsPage() {
  //mocked variables
  const mocked_my_reservations = [
    {
      hotel: "Hotel1",
      price: 11111,
      address: "address",
      transport: "transport",
      date: "2023-01-01",
      duration: 7,
      status: "No reservation",
      timeLeft: "00:23",
    },
    {
      hotel: "Hotel2",
      price: 22222,
      address: "address",
      transport: "transport",
      date: "2023-01-01",
      duration: 7,
      status: "No payment in given time",
      timeLeft: null,
    },
    {
      hotel: "Hotel3",
      price: 33333,
      address: "address",
      transport: "transport",
      date: "2023-01-01",
      duration: 7,
      status: "Payment done",
      timeLeft: null,
    },
  ];

  const getStatusStyle = (status: string) => {
    if (status === "No reservation") {
      return "middle-60 font-size-36 color-orange";
    }
    if (status === "No payment in given time") {
      return "middle-60 font-size-36 color-red";
    }
    if (status === "Payment done") {
      return "middle-60 font-size-36 color-green";
    }
  };

  return (
    <>
      <NavBarLoggedIn />
      <div className="page-content">
        <div className="page-title">My trips</div>
        {mocked_my_reservations.map((item) => (
          <div className="page-section-content">
            <div className="elements">
              <div className="left-20 font-size-36">{item.hotel}</div>
              <div className={getStatusStyle(item.status)}>{item.status}</div>
              <div className="right-20 font-size-36">{item.price} PLN</div>
            </div>
            <div className="elements">
              <div className="left-50">
                Address: {item.address} <br />
                Transport: {item.transport}
                <br />
                Date: {item.date}
                <br />
                Duration: {item.duration}
                <br />
              </div>
              <div className="right-50-relative">
                <div className="bottom-right">
                  {item.status === "No reservation" && (
                    <span style={{ fontSize: "24px" }}>
                      Time left: {item.timeLeft}
                    </span>
                  )}
                  <Button variant="secondary" className="button-style">
                    Details
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

export default MyTripsPage;
