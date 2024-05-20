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
  dateTime: string,
  numberOfNights: number,
  foodIncluded: boolean,
  rooms: Rooms[],
  price: number,
  hotelName: string,
  hotelCity: string,
  typeOfTransport: string,
  fromCity: string,
  finalized: boolean,
  reservedUntil: string,
  cancellationDate: string
} 

export default ReservationResponseType;
