// expected from swagger
// interface TourResponseType {
//     toHotelTransportOptionId: string;
//     fromHotelTransportOptionId: string;
//     hotelId: number;
//     hotelName: string;
//     hotelCity: string;
//     typeOfTransport: "Bus" | "Plane" | "Own" | "";
//     fromCity: string;
//     dateTime: string;
//     numberOfNights: number;
// } 

// export default TourResponseType;

// real response
interface TourResponseType {
    toDestinationTransportOption: string;
    hotel: string;
    fromDestinationTransportOption: string;
    transportType: string;
    fromCity: string;
    toCity: string;
    startDate: string;
    durationDays: number;
}

export default TourResponseType;