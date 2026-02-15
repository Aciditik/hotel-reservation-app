import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { Hotel } from '../../types/hotel';
import { Rating } from '../atoms/Rating';
import { Icon } from '../atoms/Icon';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';

interface HotelCardProps {
  hotel: Hotel;
  onPress: () => void;
  isFavorite?: boolean;
  onFavoritePress?: () => void;
  variant?: 'default' | 'featured';
}

export const HotelCard: React.FC<HotelCardProps> = ({
  hotel,
  onPress,
  isFavorite = false,
  onFavoritePress,
  variant = 'default',
}) => {
  if (variant === 'featured') {
    return (
      <Pressable style={styles.featuredCard} onPress={onPress}>
        <Image source={{ uri: hotel.image }} style={styles.featuredImage} />
        <View style={styles.featuredOverlay}>
          <View style={styles.featuredTop}>
            <View style={styles.ratingBadge}>
              <Icon name="star" size={12} color={Colors.star} />
              <Text style={styles.ratingBadgeText}>{hotel.rating}</Text>
            </View>
            {onFavoritePress && (
              <Pressable style={styles.favoriteButton} onPress={onFavoritePress}>
                <Icon
                  name={isFavorite ? 'heart' : 'heart-outline'}
                  size={20}
                  color={isFavorite ? Colors.favorite : Colors.white}
                />
              </Pressable>
            )}
          </View>
          <View style={styles.featuredBottom}>
            <Text style={styles.featuredName} numberOfLines={1}>{hotel.name}</Text>
            <View style={styles.featuredLocationRow}>
              <Icon name="location-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.featuredLocation} numberOfLines={1}>{hotel.location}</Text>
            </View>
            <View style={styles.featuredPriceRow}>
              <Text style={styles.featuredPrice}>${hotel.price}</Text>
              <Text style={styles.featuredPerNight}>/night</Text>
            </View>
          </View>
        </View>
      </Pressable>
    );
  }

  return (
    <Pressable style={styles.card} onPress={onPress}>
      <Image source={{ uri: hotel.image }} style={styles.image} />
      <View style={styles.content}>
        <View style={styles.contentTop}>
          <View style={styles.textContent}>
            <Text style={styles.name} numberOfLines={1}>{hotel.name}</Text>
            <View style={styles.locationRow}>
              <Icon name="location-outline" size={14} color={Colors.textSecondary} />
              <Text style={styles.location} numberOfLines={1}>{hotel.location}</Text>
            </View>
          </View>
          {onFavoritePress && (
            <Pressable style={styles.favoriteBtnSmall} onPress={onFavoritePress}>
              <Icon
                name={isFavorite ? 'heart' : 'heart-outline'}
                size={20}
                color={isFavorite ? Colors.favorite : Colors.textSecondary}
              />
            </Pressable>
          )}
        </View>
        <View style={styles.footer}>
          <Rating rating={hotel.rating} reviews={hotel.reviews} size="small" />
          <View style={styles.priceContainer}>
            <Text style={styles.price}>${hotel.price}</Text>
            <Text style={styles.perNight}>/night</Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  // Default card
  card: {
    backgroundColor: Colors.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    marginBottom: Spacing.lg,
    flexDirection: 'row',
    height: 130,
  },
  image: {
    width: 120,
    height: '100%',
    borderRadius: BorderRadius.lg,
  },
  content: {
    flex: 1,
    padding: Spacing.md,
    justifyContent: 'space-between',
  },
  contentTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
    marginRight: Spacing.sm,
  },
  name: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    marginBottom: Spacing.xs,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  location: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    flex: 1,
  },
  favoriteBtnSmall: {
    padding: 4,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  priceContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  price: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  perNight: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginLeft: 2,
  },

  // Featured card
  featuredCard: {
    width: 240,
    height: 300,
    borderRadius: BorderRadius.xl,
    overflow: 'hidden',
    marginRight: Spacing.lg,
  },
  featuredImage: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  featuredOverlay: {
    flex: 1,
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: 'rgba(0,0,0,0.25)',
  },
  featuredTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: BorderRadius.full,
    gap: 4,
  },
  ratingBadgeText: {
    color: Colors.white,
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  favoriteButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(0,0,0,0.4)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  featuredBottom: {},
  featuredName: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.bold,
    color: Colors.white,
    marginBottom: 4,
  },
  featuredLocationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 8,
  },
  featuredLocation: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.7)',
  },
  featuredPriceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
  },
  featuredPrice: {
    fontSize: FontSize.xl,
    fontWeight: FontWeight.bold,
    color: Colors.primary,
  },
  featuredPerNight: {
    fontSize: FontSize.sm,
    color: 'rgba(255,255,255,0.7)',
    marginLeft: 2,
  },
});
