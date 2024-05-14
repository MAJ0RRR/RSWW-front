import NavBarNotLoggedIn from "../components/NavBarNotLoggedIn";
import SearchBar from "../components/SearchBar";
import Button from "react-bootstrap/Button";

function SearchResultPage() {
  //mocked variables
  const mocked_search_results = [
    {
      hotel: "Hotel1",
      price: 11111,
      address: "address",
      transport: "transport",
      date: "2023-01-01",
      duration: 7,
    },
    {
      hotel: "Hotel2",
      price: 22222,
      address: "address",
      transport: "transport",
      date: "2023-01-01",
      duration: 7,
    },
    {
      hotel: "Hotel3",
      price: 33333,
      address: "address",
      transport: "transport",
      date: "2023-01-01",
      duration: 7,
    },
  ];

  return (
    <>
      <NavBarNotLoggedIn />
      <SearchBar />
      <div className="page-content">
        <div className="page-title">Holidays Poland</div>
        {mocked_search_results.map((item) => (
          <div className="page-section-content">
            <div className="elements">
              <div className="left-50 font-size-36">{item.hotel}</div>
              <div className="right-50 font-size-36">{item.price} PLN</div>
            </div>
            <div className="elements">
              <div className="left-50">
                Address: {item.address}
                <br />
                Transport: {item.transport}
                <br />
                Date: {item.date}
                <br />
                Duration: {item.duration}
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
