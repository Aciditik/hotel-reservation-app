import React from 'react';
import { View, TextInput, StyleSheet, Pressable } from 'react-native';
import { Icon } from '../atoms/Icon';
import { Colors, BorderRadius, FontSize, Spacing } from '../../constants/theme';

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onLocationPress?: () => void;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChangeText,
  placeholder = 'Search hotels...',
  onLocationPress,
}) => {
  return (
    <View style={styles.container}>
      <Icon name="search-outline" size={20} color={Colors.textSecondary} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={Colors.textMuted}
      />
      {onLocationPress && (
        <Pressable onPress={onLocationPress} style={styles.locationButton}>
          <Icon name="location-outline" size={20} color={Colors.primary} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    gap: Spacing.md,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  input: {
    flex: 1,
    fontSize: FontSize.md,
    color: Colors.textPrimary,
  },
  locationButton: {
    padding: 4,
  },
});
