interface Room {
    price: number;
    size: number;
    count: number;
}

interface HotelRoomsAvailabiltyResponseType {
    rooms: Room[];
} 

export default HotelRoomsAvailabiltyResponseType;
