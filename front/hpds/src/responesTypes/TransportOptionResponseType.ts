interface TransportOptionResponseType {
    id: string;
    type: string;
    start: string;
    end: string;
    seatsAvailable: number;
    fromCountry: string;
    fromCity: string;
    fromStreet: string;
    fromShowName: string;
    toCountry: string;
    toCity: string;
    toStreet: string;
    toShowName: string;
    priceAdult: number;
    priceUnder3: number;
    priceUnder10: number;
    priceUnder18: number;
} 

export default TransportOptionResponseType;
