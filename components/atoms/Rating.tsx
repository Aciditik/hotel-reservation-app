import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from './Icon';
import { Colors, FontWeight } from '../../constants/theme';

interface RatingProps {
  rating: number;
  reviews?: number;
  size?: 'small' | 'medium' | 'large';
}

export const Rating: React.FC<RatingProps> = ({ rating, reviews, size = 'medium' }) => {
  const fontSize = size === 'small' ? 12 : size === 'medium' ? 14 : 16;
  const iconSize = size === 'small' ? 14 : size === 'medium' ? 16 : 18;

  return (
    <View style={styles.container}>
      <Icon name="star" size={iconSize} color={Colors.star} />
      <Text style={[styles.rating, { fontSize }]}>{rating.toFixed(1)}</Text>
      {reviews !== undefined && (
        <Text style={[styles.reviews, { fontSize }]}>({reviews})</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
  reviews: {
    color: Colors.textSecondary,
    marginLeft: 2,
  },
});
