interface SearchParams {
    country: string;
    city: string;
    whenFrom: string | "";
    whenTo: string | "";
    howLongFrom: number;
    howLongTo: number;
    fromCity: string;
    fromCountry: string;
    typeOfTransport: "bus" | "plane" | "own" | "";
    adults: number;
    upTo3: number;
    upTo10: number;
    upTo18: number;
}

export default SearchParams;