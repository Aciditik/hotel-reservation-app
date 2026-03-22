import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, StatusBar, Pressable, Image, Dimensions } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Ionicons } from '@expo/vector-icons';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../constants/theme';

const { width } = Dimensions.get('window');

const HOTELS: Record<string, any> = {
  '1': { name: 'Santorini', location: 'Greece', price: 488, rating: 4.9, reviews: 128, image: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800', description: 'Luxury hotel with Aegean Sea views.', amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Bar', 'Gym'] },
  '2': { name: 'Hotel Royal', location: 'Spain', price: 280, rating: 4.8, reviews: 95, image: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800', description: 'Elegant hotel in Barcelona.', amenities: ['WiFi', 'Pool', 'Restaurant', 'Bar', 'Parking'] },
  '3': { name: 'BaLi Motel Vung Tau', location: 'Indonesia', price: 580, rating: 4.9, reviews: 156, image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800', description: 'Tropical paradise with ocean views.', amenities: ['WiFi', 'Pool', 'Spa', 'Restaurant', 'Beach', 'Gym'] },
};

export default function HotelDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [guests, setGuests] = useState(2);
  const hotel = HOTELS[id as string] || HOTELS['3'];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{ uri: hotel.image }} style={styles.headerImage} />
          <Pressable style={styles.backButton} onPress={() => router.back()}>
            <Ionicons name="arrow-back" size={24} color={Colors.textPrimary} />
          </Pressable>
          <Pressable style={styles.favoriteButton}>
            <Ionicons name="heart-outline" size={24} color={Colors.textPrimary} />
          </Pressable>
        </View>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Text style={styles.hotelName}>{hotel.name}</Text>
              <View style={styles.locationRow}>
                <Ionicons name="location-outline" size={16} color={Colors.textSecondary} />
                <Text style={styles.location}>{hotel.location}</Text>
              </View>
            </View>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors.star} />
              <Text style={styles.rating}>{hotel.rating}</Text>
              <Text style={styles.reviews}>({hotel.reviews})</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{hotel.description}</Text>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesGrid}>
              {hotel.amenities.map((amenity: string, index: number) => (
                <View key={index} style={styles.amenityChip}>
                  <Ionicons name="checkmark-circle" size={18} color={Colors.primary} />
                  <Text style={styles.amenityText}>{amenity}</Text>
                </View>
              ))}
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Details</Text>
            <View style={styles.dateRow}>
              <View style={styles.dateCard}>
                <Text style={styles.dateLabel}>Check In</Text>
                <Text style={styles.dateValue}>Dec 20</Text>
              </View>
              <View style={styles.dateCard}>
                <Text style={styles.dateLabel}>Check Out</Text>
                <Text style={styles.dateValue}>Dec 25</Text>
              </View>
            </View>
            <View style={styles.guestsCard}>
              <Text style={styles.guestsLabel}>Guests</Text>
              <View style={styles.guestsControl}>
                <Pressable style={styles.guestsButton} onPress={() => setGuests(Math.max(1, guests - 1))}>
                  <Ionicons name="remove" size={20} color={Colors.textPrimary} />
                </Pressable>
                <Text style={styles.guestsValue}>{guests}</Text>
                <Pressable style={styles.guestsButton} onPress={() => setGuests(Math.min(10, guests + 1))}>
                  <Ionicons name="add" size={20} color={Colors.textPrimary} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={[styles.bottomBar, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.priceContainer}>
          <Text style={styles.priceLabel}>Price</Text>
          <Text style={styles.price}>${hotel.price}/night</Text>
        </View>
        <Pressable style={styles.bookButton} onPress={() => alert('Booking confirmed!')}>
          <Text style={styles.bookButtonText}>Book Now</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  imageContainer: { width: width, height: 300, position: 'relative' },
  headerImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  backButton: { position: 'absolute', top: 16, left: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  favoriteButton: { position: 'absolute', top: 16, right: 16, width: 40, height: 40, borderRadius: 20, backgroundColor: Colors.white, alignItems: 'center', justifyContent: 'center', elevation: 3 },
  content: { padding: Spacing.xl },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: Spacing.xxl },
  headerLeft: { flex: 1 },
  hotelName: { fontSize: FontSize.xxl, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: 8 },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  location: { fontSize: FontSize.md, color: Colors.textSecondary },
  ratingContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primaryMuted, paddingHorizontal: 12, paddingVertical: 6, borderRadius: BorderRadius.lg, gap: 4 },
  rating: { fontSize: FontSize.md, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  reviews: { fontSize: FontSize.sm, color: Colors.textSecondary },
  section: { marginBottom: Spacing.xxl },
  sectionTitle: { fontSize: FontSize.lg, fontWeight: FontWeight.bold, color: Colors.textPrimary, marginBottom: Spacing.md },
  description: { fontSize: FontSize.md, color: Colors.textSecondary, lineHeight: 22 },
  amenitiesGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: Spacing.sm },
  amenityChip: { flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.surface, paddingHorizontal: 12, paddingVertical: 8, borderRadius: BorderRadius.lg, gap: 6, borderWidth: 1, borderColor: Colors.border },
  amenityText: { fontSize: FontSize.sm, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  dateRow: { flexDirection: 'row', gap: Spacing.md, marginBottom: Spacing.md },
  dateCard: { flex: 1, backgroundColor: Colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: Colors.border },
  dateLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 4 },
  dateValue: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.textPrimary },
  guestsCard: { backgroundColor: Colors.surface, padding: Spacing.lg, borderRadius: BorderRadius.lg, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', borderWidth: 1, borderColor: Colors.border },
  guestsLabel: { fontSize: FontSize.md, color: Colors.textPrimary, fontWeight: FontWeight.medium },
  guestsControl: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  guestsButton: { width: 32, height: 32, borderRadius: 16, backgroundColor: Colors.primaryMuted, alignItems: 'center', justifyContent: 'center' },
  guestsValue: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.textPrimary, minWidth: 30, textAlign: 'center' },
  bottomBar: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: Spacing.xl, paddingTop: Spacing.lg, backgroundColor: Colors.surface, borderTopWidth: 1, borderTopColor: Colors.border, elevation: 8 },
  priceContainer: { flex: 1 },
  priceLabel: { fontSize: FontSize.sm, color: Colors.textSecondary, marginBottom: 4 },
  price: { fontSize: FontSize.xl, fontWeight: FontWeight.bold, color: Colors.textPrimary },
  bookButton: { backgroundColor: Colors.primary, paddingHorizontal: 32, paddingVertical: 16, borderRadius: BorderRadius.lg, elevation: 4 },
  bookButtonText: { fontSize: FontSize.lg, fontWeight: FontWeight.semibold, color: Colors.white },
});
