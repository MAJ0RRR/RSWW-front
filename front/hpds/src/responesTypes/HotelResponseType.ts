interface Room {
    price: number;
    size: number;
    count: number;
}

interface HotelResponseType {
    id: string;
    name: string;
    country: string;
    city: string;
    street: string;
    foodPricePerPerson: number;
    rooms: Room[];
} 

export default HotelResponseType;
