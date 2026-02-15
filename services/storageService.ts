import AsyncStorage from '@react-native-async-storage/async-storage';
import { Booking } from '../types/hotel';

const BOOKINGS_KEY = '@hotel_bookings';
const FAVORITES_KEY = '@hotel_favorites';

export const saveBooking = async (booking: Booking): Promise<void> => {
  try {
    const existingBookings = await getBookings();
    const updatedBookings = [...existingBookings, booking];
    await AsyncStorage.setItem(BOOKINGS_KEY, JSON.stringify(updatedBookings));
  } catch (error) {
    console.error('Error saving booking:', error);
    throw error;
  }
};

export const getBookings = async (): Promise<Booking[]> => {
  try {
    const bookingsJson = await AsyncStorage.getItem(BOOKINGS_KEY);
    return bookingsJson ? JSON.parse(bookingsJson) : [];
  } catch (error) {
    console.error('Error getting bookings:', error);
    return [];
  }
};

export const saveFavorite = async (hotelId: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    if (!favorites.includes(hotelId)) {
      const updatedFavorites = [...favorites, hotelId];
      await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
    }
  } catch (error) {
    console.error('Error saving favorite:', error);
    throw error;
  }
};

export const removeFavorite = async (hotelId: string): Promise<void> => {
  try {
    const favorites = await getFavorites();
    const updatedFavorites = favorites.filter(id => id !== hotelId);
    await AsyncStorage.setItem(FAVORITES_KEY, JSON.stringify(updatedFavorites));
  } catch (error) {
    console.error('Error removing favorite:', error);
    throw error;
  }
};

export const getFavorites = async (): Promise<string[]> => {
  try {
    const favoritesJson = await AsyncStorage.getItem(FAVORITES_KEY);
    return favoritesJson ? JSON.parse(favoritesJson) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};
