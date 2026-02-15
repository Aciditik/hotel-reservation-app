import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Icon } from '../atoms/Icon';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';

interface AmenityChipProps {
  amenity: string;
}

const getAmenityIcon = (amenity: string): keyof typeof import('@expo/vector-icons').Ionicons.glyphMap => {
  const lowerAmenity = amenity.toLowerCase();
  if (lowerAmenity.includes('wifi')) return 'wifi';
  if (lowerAmenity.includes('pool')) return 'water';
  if (lowerAmenity.includes('spa')) return 'flower';
  if (lowerAmenity.includes('restaurant')) return 'restaurant';
  if (lowerAmenity.includes('gym')) return 'fitness';
  if (lowerAmenity.includes('bar')) return 'wine';
  if (lowerAmenity.includes('beach')) return 'sunny';
  if (lowerAmenity.includes('parking')) return 'car';
  if (lowerAmenity.includes('room service')) return 'bed';
  if (lowerAmenity.includes('sauna')) return 'flame';
  if (lowerAmenity.includes('ski')) return 'snow';
  if (lowerAmenity.includes('fireplace')) return 'flame';
  if (lowerAmenity.includes('concierge')) return 'person';
  if (lowerAmenity.includes('business')) return 'briefcase';
  if (lowerAmenity.includes('rooftop')) return 'wine';
  if (lowerAmenity.includes('water')) return 'water';
  return 'checkmark-circle';
};

export const AmenityChip: React.FC<AmenityChipProps> = ({ amenity }) => {
  return (
    <View style={styles.chip}>
      <Icon name={getAmenityIcon(amenity)} size={16} color={Colors.primary} />
      <Text style={styles.text}>{amenity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primaryMuted,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: BorderRadius.full,
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(200, 164, 92, 0.25)',
  },
  text: {
    fontSize: FontSize.sm,
    color: Colors.primary,
    fontWeight: FontWeight.medium,
  },
});
