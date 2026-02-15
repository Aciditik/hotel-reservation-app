import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  StatusBar,
  Alert,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter, useLocalSearchParams } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { ImageGallery } from '../../components/organisms/ImageGallery';
import { Button } from '../../components/atoms/Button';
import { Rating } from '../../components/atoms/Rating';
import { Icon } from '../../components/atoms/Icon';
import { AmenityChip } from '../../components/molecules/AmenityChip';
import { DatePicker } from '../../components/molecules/DatePicker';
import { getHotelById } from '../../services/hotelService';
import { saveBooking } from '../../services/storageService';
import { scheduleBookingConfirmation, scheduleCheckInReminder } from '../../services/notificationService';
import { Hotel, Booking } from '../../types/hotel';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../../constants/theme';

export default function HotelDetails() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams();
  const [hotel, setHotel] = useState<Hotel | null>(null);
  const [checkIn, setCheckIn] = useState('Dec 20, 2024');
  const [checkOut, setCheckOut] = useState('Dec 25, 2024');
  const [guests, setGuests] = useState(2);
  const [loading, setLoading] = useState(false);
  const [customImages, setCustomImages] = useState<string[]>([]);

  useEffect(() => {
    if (id) {
      const hotelData = getHotelById(id as string);
      setHotel(hotelData || null);
    }
  }, [id]);

  const handleBooking = async () => {
    if (!hotel) return;

    try {
      setLoading(true);
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

      const nights = 5;
      const totalPrice = hotel.price * nights;

      const booking: Booking = {
        id: Date.now().toString(),
        hotelId: hotel.id,
        hotelName: hotel.name,
        checkIn,
        checkOut,
        guests,
        totalPrice,
        createdAt: new Date().toISOString(),
      };

      await saveBooking(booking);
      await scheduleBookingConfirmation(hotel.name, checkIn);
      await scheduleCheckInReminder(hotel.name, checkIn);

      Alert.alert(
        'Booking Confirmed!',
        `Your reservation at ${hotel.name} has been confirmed.\n\nCheck-in: ${checkIn}\nCheck-out: ${checkOut}\nGuests: ${guests}\nTotal: $${totalPrice}`,
        [
          {
            text: 'OK',
            onPress: () => router.back(),
          },
        ]
      );
    } catch (error) {
      Alert.alert('Error', 'Failed to complete booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddImage = (uri: string) => {
    setCustomImages([...customImages, uri]);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    Alert.alert('Success', 'Photo added to gallery!');
  };

  const handleDatePress = (type: 'checkIn' | 'checkOut') => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    Alert.alert('Date Picker', `Select ${type === 'checkIn' ? 'check-in' : 'check-out'} date`, [
      { text: 'Cancel', style: 'cancel' },
    ]);
  };

  const handleGuestsChange = (increment: boolean) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setGuests((prev) => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.max(1, Math.min(10, newValue));
    });
  };

  if (!hotel) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <View style={styles.errorContainer}>
          <ActivityIndicator size="large" color={Colors.primary} />
          <Text style={styles.errorText}>Loading hotel...</Text>
        </View>
      </View>
    );
  }

  const allImages = [...hotel.gallery, ...customImages];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Floating header buttons */}
      <View style={[styles.floatingHeader, { top: insets.top + 8 }]}>
        <Pressable style={styles.headerBtn} onPress={() => router.back()}>
          <Icon name="arrow-back" size={22} color={Colors.white} />
        </Pressable>
        <Pressable style={styles.headerBtn}>
          <Icon name="share-outline" size={22} color={Colors.white} />
        </Pressable>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageGallery images={allImages} onAddImage={handleAddImage} />

        <View style={styles.content}>
          {/* Title & Rating Row */}
          <View style={styles.titleRow}>
            <View style={styles.titleLeft}>
              <Text style={styles.name}>{hotel.name}</Text>
              <View style={styles.locationRow}>
                <Icon name="location-outline" size={16} color={Colors.primary} />
                <Text style={styles.location}>{hotel.location}</Text>
              </View>
            </View>
            <View style={styles.ratingBox}>
              <Icon name="star" size={16} color={Colors.star} />
              <Text style={styles.ratingText}>{hotel.rating}</Text>
            </View>
          </View>

          {/* Reviews count */}
          <Text style={styles.reviewCount}>{hotel.reviews.toLocaleString()} reviews</Text>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>About</Text>
            <Text style={styles.description}>{hotel.description}</Text>
          </View>

          {/* Amenities */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Amenities</Text>
            <View style={styles.amenitiesContainer}>
              {hotel.amenities.map((amenity, index) => (
                <AmenityChip key={index} amenity={amenity} />
              ))}
            </View>
          </View>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Booking Details */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Booking Details</Text>
            <View style={styles.dateContainer}>
              <View style={styles.dateItem}>
                <DatePicker
                  label="Check-in"
                  date={checkIn}
                  onPress={() => handleDatePress('checkIn')}
                />
              </View>
              <View style={styles.dateItem}>
                <DatePicker
                  label="Check-out"
                  date={checkOut}
                  onPress={() => handleDatePress('checkOut')}
                />
              </View>
            </View>

            <View style={styles.guestsContainer}>
              <View style={styles.guestsLabelRow}>
                <Icon name="people-outline" size={20} color={Colors.primary} />
                <Text style={styles.guestsLabel}>Guests</Text>
              </View>
              <View style={styles.guestsControls}>
                <Pressable
                  style={styles.guestsButton}
                  onPress={() => handleGuestsChange(false)}
                >
                  <Icon name="remove" size={18} color={Colors.primary} />
                </Pressable>
                <Text style={styles.guestsValue}>{guests}</Text>
                <Pressable
                  style={styles.guestsButton}
                  onPress={() => handleGuestsChange(true)}
                >
                  <Icon name="add" size={18} color={Colors.primary} />
                </Pressable>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Footer */}
      <View style={[styles.footer, { paddingBottom: insets.bottom + 16 }]}>
        <View style={styles.priceSection}>
          <Text style={styles.priceLabel}>Total (5 nights)</Text>
          <Text style={styles.price}>${hotel.price * 5}</Text>
        </View>
        <Button
          title="Book Now"
          onPress={handleBooking}
          loading={loading}
          fullWidth
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  // Floating header
  floatingHeader: {
    position: 'absolute',
    left: 0,
    right: 0,
    zIndex: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.xl,
  },
  headerBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(0, 0, 0, 0.45)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  // Content
  content: {
    padding: Spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: Spacing.sm,
  },
  titleLeft: {
    flex: 1,
    marginRight: Spacing.md,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: 6,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  ratingBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryMuted,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: BorderRadius.md,
    gap: 6,
  },
  ratingText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  reviewCount: {
    fontSize: FontSize.sm,
    color: Colors.textMuted,
    marginBottom: Spacing.lg,
  },
  // Divider
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginVertical: Spacing.xl,
  },
  // Sections
  section: {
    marginBottom: Spacing.lg,
  },
  sectionTitle: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.md,
  },
  description: {
    fontSize: FontSize.md,
    lineHeight: 24,
    color: Colors.textSecondary,
  },
  amenitiesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  // Dates
  dateContainer: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
  },
  dateItem: {
    flex: 1,
  },
  // Guests
  guestsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  guestsLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  guestsLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  guestsControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  guestsButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(200, 164, 92, 0.3)',
  },
  guestsValue: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    minWidth: 30,
    textAlign: 'center',
  },
  // Footer
  footer: {
    paddingHorizontal: Spacing.xl,
    paddingTop: Spacing.lg,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    backgroundColor: Colors.surface,
    gap: Spacing.md,
  },
  priceSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceLabel: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
  price: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  // Error
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
    gap: Spacing.lg,
  },
  errorText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
