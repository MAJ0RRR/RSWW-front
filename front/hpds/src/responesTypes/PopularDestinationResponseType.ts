interface Offer {
    city: string;
    hotels: string[];
}

interface PopularDestinationResponseType {
    country: string;
    offers: Offer[];
} 

export default PopularDestinationResponseType;