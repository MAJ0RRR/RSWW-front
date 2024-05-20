interface Rooms {
    size: number;
    number: number;
}


interface ReservationResponseType {
  id: string,
  toHotelTransportOptionId: string,
  fromHotelTransportOptionId: string,
  hotelId: string,
  numberOfAdults: number,
  numberOfUnder3: number,
  numberOfUnder10: number,
  numberOfUnder18: number,
  dateTime: Date,
  numberOfNights: number,
  foodIncluded: boolean,
  rooms: Rooms[],
  price: number,
  hotelName: string,
  hotelCity: string,
  typeOfTransport: string,
  fromCity: string,
  finalized: boolean,
  reservedUntil: Date,
  cancellationDate: Date
} 

export default ReservationResponseType;
