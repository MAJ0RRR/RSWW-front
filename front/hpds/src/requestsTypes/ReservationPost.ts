interface Rooms {
    size: number;
    number: number;
}

interface ReservationPost {
    toHotelTransportOptionId: string;
    fromHotelTransportOptionId: string;
    hotelId: number;
    numberOfAdults: number;
    numberOfUnder3: number;
    numberOfUnder10: number;
    numberOfUnder18: number;
    dateTime: string;
    numberOfNights: number;
    foodIncluded: boolean;
    rooms: Rooms[];
} 

export default ReservationPost;
