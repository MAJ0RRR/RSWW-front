interface Rooms {
    size: number;
    number: number;
}

interface ReservationPost {
    toHotelTransportOptionId: string | null;
    fromHotelTransportOptionId: string | null;
    hotelId: string;
    numberOfAdults: number;
    numberOfUnder3: number;
    numberOfUnder10: number;
    numberOfUnder18: number;
    dateTime: string | "";
    numberOfNights: number;
    foodIncluded: boolean;
    rooms: Rooms[];
} 

export default ReservationPost;
