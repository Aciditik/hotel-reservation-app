import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView,
  Pressable,
  Image,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../constants/theme';

const CATEGORIES = [
  { id: 'hotel', label: 'Hotel', icon: 'bed-outline' },
  { id: 'flight', label: 'Flight', icon: 'airplane-outline' },
  { id: 'place', label: 'Place', icon: 'location-outline' },
  { id: 'food', label: 'Food', icon: 'restaurant-outline' },
];

const POPULAR_HOTELS = [
  {
    id: '1',
    name: 'Santorini',
    location: 'Greece',
    price: 488,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800',
  },
  {
    id: '2',
    name: 'Hotel Royal',
    location: 'Spain',
    price: 280,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800',
  },
];

const HOT_DEALS = [
  {
    id: '3',
    name: 'BaLi Motel Vung Tau',
    location: 'Indonesia',
    price: 580,
    rating: 4.9,
    discount: 28,
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800',
  },
];

export default function Home() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [selectedCategory, setSelectedCategory] = useState('hotel');

  const handleCategoryPress = (categoryId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setSelectedCategory(categoryId);
  };

  const handleHotelPress = (hotelId: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push(`/hotel/${hotelId}` as any);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Where you</Text>
          <Text style={styles.headerTitle}>wanna go?</Text>
          <Pressable style={styles.searchIcon}>
            <Ionicons name="search-outline" size={24} color={Colors.textPrimary} />
          </Pressable>
        </View>

        {/* Category Tabs */}
        <View style={styles.categoriesContainer}>
          {CATEGORIES.map((category) => (
            <Pressable
              key={category.id}
              style={[
                styles.categoryTab,
                selectedCategory === category.id && styles.categoryTabActive,
              ]}
              onPress={() => handleCategoryPress(category.id)}
            >
              <Ionicons
                name={category.icon as any}
                size={24}
                color={selectedCategory === category.id ? Colors.white : Colors.textSecondary}
              />
              <Text
                style={[
                  styles.categoryLabel,
                  selectedCategory === category.id && styles.categoryLabelActive,
                ]}
              >
                {category.label}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* Popular Hotels */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Hotels</Text>
          <Pressable>
            <Text style={styles.seeAll}>See all</Text>
          </Pressable>
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.hotelsScroll}
        >
          {POPULAR_HOTELS.map((hotel) => (
            <Pressable
              key={hotel.id}
              style={styles.hotelCard}
              onPress={() => handleHotelPress(hotel.id)}
            >
              <Image source={{ uri: hotel.image }} style={styles.hotelImage} />
              <View style={styles.hotelOverlay}>
                <View style={styles.hotelInfo}>
                  <Text style={styles.hotelName}>{hotel.name}</Text>
                  <View style={styles.locationRow}>
                    <Ionicons name="location-outline" size={14} color={Colors.white} />
                    <Text style={styles.hotelLocation}>{hotel.location}</Text>
                  </View>
                  <View style={styles.priceRow}>
                    <Text style={styles.hotelPrice}>${hotel.price}/night</Text>
                    <View style={styles.ratingBadge}>
                      <Ionicons name="star" size={12} color={Colors.star} />
                      <Text style={styles.ratingText}>{hotel.rating}</Text>
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          ))}
        </ScrollView>

        {/* Hot Deals */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Hot Deals</Text>
        </View>

        {HOT_DEALS.map((hotel) => (
          <Pressable
            key={hotel.id}
            style={styles.dealCard}
            onPress={() => handleHotelPress(hotel.id)}
          >
            {hotel.discount && (
              <View style={styles.discountBadge}>
                <Text style={styles.discountText}>{hotel.discount}% OFF</Text>
              </View>
            )}
            <Image source={{ uri: hotel.image }} style={styles.dealImage} />
            <View style={styles.dealOverlay}>
              <View style={styles.dealInfo}>
                <Text style={styles.dealName}>{hotel.name}</Text>
                <View style={styles.locationRow}>
                  <Ionicons name="location-outline" size={14} color={Colors.white} />
                  <Text style={styles.dealLocation}>{hotel.location}</Text>
                </View>
                <View style={styles.dealFooter}>
                  <Text style={styles.dealPrice}>${hotel.price}/night</Text>
                  <View style={styles.ratingBadge}>
                    <Ionicons name="star" size={12} color={Colors.star} />
                    <Text style={styles.ratingText}>{hotel.rating}</Text>
                  </View>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
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
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  headerTitle: {
    fontSize: 32,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: 40,
  },
  searchIcon: {
    position: 'absolute',
    right: Spacing.xl,
    top: Spacing.lg + 8,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.surface,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  // Categories
  categoriesContainer: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.xl,
    marginBottom: Spacing.xxl,
    gap: Spacing.md,
  },
  categoryTab: {
    flex: 1,
    backgroundColor: Colors.surface,
    paddingVertical: Spacing.lg,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  categoryTabActive: {
    backgroundColor: Colors.primary,
    shadowColor: Colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.medium,
    color: Colors.textSecondary,
  },
  categoryLabelActive: {
    color: Colors.white,
    fontWeight: FontWeight.semibold,
  },
  // Section Header
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
  // Hotels Scroll
  hotelsScroll: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxl,
    gap: Spacing.lg,
  },
  hotelCard: {
    width: 200,
    height: 240,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  hotelImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  hotelOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    padding: Spacing.md,
  },
  hotelInfo: {
    gap: 4,
  },
  hotelName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  hotelLocation: {
    fontSize: FontSize.sm,
    color: Colors.white,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  hotelPrice: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: BorderRadius.sm,
    gap: 4,
  },
  ratingText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  // Deal Card
  dealCard: {
    marginHorizontal: Spacing.xl,
    height: 200,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    backgroundColor: Colors.surface,
    shadowColor: Colors.shadow,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    marginBottom: Spacing.lg,
  },
  discountBadge: {
    position: 'absolute',
    top: Spacing.md,
    left: Spacing.md,
    backgroundColor: Colors.discount,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: BorderRadius.full,
    zIndex: 1,
  },
  discountText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  dealImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  dealOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: Spacing.lg,
  },
  dealInfo: {
    gap: 4,
  },
  dealName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
  },
  dealLocation: {
    fontSize: FontSize.sm,
    color: Colors.white,
  },
  dealFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  dealPrice: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
});
