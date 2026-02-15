export interface Hotel {
  id: string;
  name: string;
  location: string;
  rating: number;
  reviews: number;
  price: number;
  image: string;
  description: string;
  amenities: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  gallery: string[];
}

export interface Booking {
  id: string;
  hotelId: string;
  hotelName: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  totalPrice: number;
  createdAt: string;
}
