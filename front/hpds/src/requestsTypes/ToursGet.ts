interface ToursGet {
    numberOfPeople: number;
    fromCity: string | "";
    fromCountry: string | "";
    toCity: string | "";
    toCountry: string | "";
    minStart: string;
    maxEnd: string;
    minDuration: number;
    maxDuration: number;
    typeOfTransport: string;
}

export default ToursGet;