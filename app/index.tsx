import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Alert,
  ScrollView,
  Pressable,
  FlatList,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { SearchBar } from '../components/molecules/SearchBar';
import { HotelCard } from '../components/molecules/HotelCard';
import { Icon } from '../components/atoms/Icon';
import { getHotels } from '../services/hotelService';
import { getFavorites, saveFavorite, removeFavorite } from '../services/storageService';
import { getCurrentLocation, calculateDistance } from '../services/locationService';
import { Hotel } from '../types/hotel';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../constants/theme';

const CATEGORIES = ['All', 'Luxury', 'Resort', 'Villa', 'Apartment'];

export default function Index() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    filterHotels();
  }, [searchQuery, hotels]);

  const loadData = async () => {
    try {
      const hotelData = getHotels();
      setHotels(hotelData);
      setFilteredHotels(hotelData);

      const savedFavorites = await getFavorites();
      setFavorites(savedFavorites);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterHotels = () => {
    if (!searchQuery.trim()) {
      setFilteredHotels(hotels);
      return;
    }

    const filtered = hotels.filter(
      (hotel) =>
        hotel.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hotel.location.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredHotels(filtered);
  };

  const handleLocationPress = async () => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

      const location = await getCurrentLocation();

      if (!location) {
        Alert.alert(
          'Location Permission Required',
          'Please enable location services to find hotels near you.',
          [{ text: 'OK' }]
        );
        return;
      }

      const hotelsWithDistance = hotels.map((hotel) => ({
        ...hotel,
        distance: calculateDistance(
          location.latitude,
          location.longitude,
          hotel.coordinates.latitude,
          hotel.coordinates.longitude
        ),
      }));

      const sortedHotels = hotelsWithDistance.sort((a, b) => a.distance - b.distance);
      setFilteredHotels(sortedHotels);

      Alert.alert('Success', 'Hotels sorted by distance from your location!');
    } catch (error) {
      Alert.alert('Error', 'Failed to get your location. Please try again.');
    }
  };

  const handleFavoritePress = async (hotelId: string) => {
    try {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

      if (favorites.includes(hotelId)) {
        await removeFavorite(hotelId);
        setFavorites(favorites.filter((id) => id !== hotelId));
      } else {
        await saveFavorite(hotelId);
        setFavorites([...favorites, hotelId]);
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to update favorites');
    }
  };

  const handleHotelPress = (hotel: Hotel) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push({
      pathname: '/hotel/[id]',
      params: { id: hotel.id },
    });
  };

  const featuredHotels = filteredHotels.slice(0, 2);
  const nearbyHotels = filteredHotels.slice(0);

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="light-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Text style={styles.greeting}>Hello, Traveler</Text>
            <Text style={styles.subtitle}>Find your perfect stay</Text>
          </View>
          <Pressable style={styles.avatarContainer}>
            <Icon name="person-circle-outline" size={42} color={Colors.primary} />
          </Pressable>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <SearchBar
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder="Search hotels, cities..."
            onLocationPress={handleLocationPress}
          />
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((category) => (
            <Pressable
              key={category}
              style={[
                styles.categoryChip,
                selectedCategory === category && styles.categoryChipActive,
              ]}
              onPress={() => {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                setSelectedCategory(category);
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextActive,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        {/* Featured Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Featured Hotels</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.featuredContainer}
        >
          {featuredHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onPress={() => handleHotelPress(hotel)}
              isFavorite={favorites.includes(hotel.id)}
              onFavoritePress={() => handleFavoritePress(hotel.id)}
              variant="featured"
            />
          ))}
        </ScrollView>

        {/* Nearby Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Nearby Hotels</Text>
          <Pressable>
            <Text style={styles.seeAll}>See All</Text>
          </Pressable>
        </View>

        <View style={styles.nearbyContainer}>
          {nearbyHotels.map((hotel) => (
            <HotelCard
              key={hotel.id}
              hotel={hotel}
              onPress={() => handleHotelPress(hotel)}
              isFavorite={favorites.includes(hotel.id)}
              onFavoritePress={() => handleFavoritePress(hotel.id)}
              variant="default"
            />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollContent: {
    paddingBottom: 32,
  },
  // Header
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  headerLeft: {},
  greeting: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Search
  searchContainer: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.lg,
  },
  // Categories
  categoriesContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xl,
    gap: Spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    marginRight: Spacing.sm,
  },
  categoryChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  categoryText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  categoryTextActive: {
    color: Colors.textDark,
    fontWeight: FontWeight.semibold,
  },
  // Section headers
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
  },
  seeAll: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },
  // Featured
  featuredContainer: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
  },
  // Nearby
  nearbyContainer: {
    paddingHorizontal: Spacing.xl,
  },
});
