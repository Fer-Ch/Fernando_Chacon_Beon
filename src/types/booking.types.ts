/** Restful-Booker data contracts. Types only: no logic. */

export interface BookingDates {
  checkin: string; // YYYY-MM-DD
  checkout: string; // YYYY-MM-DD
}

export interface Booking {
  firstname: string;
  lastname: string;
  totalprice: number;
  depositpaid: boolean;
  bookingdates: BookingDates;
  additionalneeds?: string;
}

export interface Credentials {
  username: string;
  password: string;
}
