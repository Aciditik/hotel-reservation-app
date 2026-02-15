import { Hotel } from '../types/hotel';

export const mockHotels: Hotel[] = [
  {
    id: '1',
    name: 'The Grandhaven Palace',
    location: 'Paris, France',
    rating: 4.8,
    reviews: 1234,
    price: 350,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
    description: 'An iconic Parisian landmark offering unparalleled luxury. Enjoy breathtaking views, Michelin-starred dining, and a world-class spa in the heart of the City of Light.',
    amenities: ['Free WiFi', 'Pool', 'Spa', 'Restaurant', 'Gym', 'Room Service'],
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    gallery: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800',
    ],
  },
  {
    id: '2',
    name: 'Azure Oceanfront Resort',
    location: 'Bali, Indonesia',
    rating: 4.9,
    reviews: 2156,
    price: 280,
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
    description: 'A tropical paradise where crystal-clear waters meet pristine white sand. Indulge in private villas, infinity pools, and authentic Balinese hospitality.',
    amenities: ['Beach Access', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Water Sports'],
    coordinates: {
      latitude: -8.3405,
      longitude: 115.0920,
    },
    gallery: [
      'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800',
      'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800',
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?w=800',
    ],
  },
  {
    id: '3',
    name: 'Alpine Summit Lodge',
    location: 'Swiss Alps, Switzerland',
    rating: 4.7,
    reviews: 892,
    price: 420,
    image: 'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
    description: 'Perched among majestic peaks, this exclusive retreat blends alpine charm with modern elegance. Ski-in access, roaring fireplaces, and panoramic mountain views await.',
    amenities: ['Ski Access', 'Fireplace', 'Restaurant', 'Spa', 'Gym', 'Sauna'],
    coordinates: {
      latitude: 46.8182,
      longitude: 8.2275,
    },
    gallery: [
      'https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=800',
      'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800',
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    ],
  },
  {
    id: '4',
    name: 'The Manhattan Penthouse',
    location: 'New York, USA',
    rating: 4.6,
    reviews: 1567,
    price: 380,
    image: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
    description: 'Elevated luxury above the Manhattan skyline. A sleek, contemporary haven with rooftop cocktails, curated art, and the pulse of New York at your doorstep.',
    amenities: ['Free WiFi', 'Rooftop Bar', 'Gym', 'Concierge', 'Business Center'],
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    gallery: [
      'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=800',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=800',
    ],
  },
];

export const getHotels = (): Hotel[] => {
  return mockHotels;
};

export const getHotelById = (id: string): Hotel | undefined => {
  return mockHotels.find(hotel => hotel.id === id);
};
