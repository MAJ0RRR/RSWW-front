interface TourResponseType {
    toHotelTransportOptionId: string;
    fromHotelTransportOptionId: string;
    hotelId: number;
    hotelName: string;
    hotelCity: string;
    typeOfTransport: "Bus" | "Plane" | "Own" | "";
    fromCity: string;
    dateTime: string;
    numberOfNights: number;
} 

export default TourResponseType;
