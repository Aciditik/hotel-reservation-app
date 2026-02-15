import React from 'react';
import { FlatList, StyleSheet, View, Text, ActivityIndicator } from 'react-native';
import { Hotel } from '../../types/hotel';
import { HotelCard } from '../molecules/HotelCard';
import { Colors, FontSize, Spacing } from '../../constants/theme';

interface HotelListProps {
  hotels: Hotel[];
  onHotelPress: (hotel: Hotel) => void;
  favorites: string[];
  onFavoritePress: (hotelId: string) => void;
  loading?: boolean;
}

export const HotelList: React.FC<HotelListProps> = ({
  hotels,
  onHotelPress,
  favorites,
  onFavoritePress,
  loading = false,
}) => {
  if (loading) {
    return (
      <View style={styles.emptyContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.emptyText}>Finding the best hotels...</Text>
      </View>
    );
  }

  if (hotels.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>No hotels found</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={hotels}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <HotelCard
          hotel={item}
          onPress={() => onHotelPress(item)}
          isFavorite={favorites.includes(item.id)}
          onFavoritePress={() => onFavoritePress(item.id)}
        />
      )}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    paddingHorizontal: Spacing.xl,
    paddingBottom: Spacing.xxxl,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: Spacing.xxxl,
    gap: Spacing.lg,
  },
  emptyText: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
  },
});
