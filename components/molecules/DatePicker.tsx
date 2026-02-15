import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Icon } from '../atoms/Icon';
import { Colors, BorderRadius, FontSize, FontWeight, Spacing } from '../../constants/theme';

interface DatePickerProps {
  label: string;
  date: string;
  onPress: () => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ label, date, onPress }) => {
  return (
    <Pressable style={styles.container} onPress={onPress}>
      <View style={styles.content}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
      <Icon name="calendar-outline" size={22} color={Colors.primary} />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderRadius: BorderRadius.md,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  content: {
    flex: 1,
  },
  label: {
    fontSize: FontSize.xs,
    color: Colors.textSecondary,
    marginBottom: 4,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  date: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
    color: Colors.textPrimary,
  },
});
