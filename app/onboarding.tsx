import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Pressable,
  Image,
  Dimensions,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { Colors, FontSize, FontWeight, Spacing, BorderRadius } from '../constants/theme';

const { width } = Dimensions.get('window');
const GRID_SPACING = 8;
const COLUMN_WIDTH = (width - 80 - GRID_SPACING * 2) / 3;

// Sample images for the grid
const GRID_IMAGES = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400',
  'https://images.unsplash.com/photo-1602002418816-5c0aeef426aa?w=400',
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=400',
  'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400',
  'https://images.unsplash.com/photo-1445019980597-93fa8acb246c?w=400',
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=400',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400',
  'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=400',
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=400',
];

export default function Onboarding() {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/');
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <StatusBar barStyle="dark-content" />
      
      <View style={styles.content}>
        {/* Image Grid */}
        <View style={styles.gridContainer}>
          <View style={styles.gridRow}>
            <View style={[styles.gridItem, styles.gridItemTall]}>
              <Image source={{ uri: GRID_IMAGES[0] }} style={styles.gridImage} />
            </View>
            <View style={styles.gridColumn}>
              <View style={[styles.gridItem, styles.gridItemSmall]}>
                <Image source={{ uri: GRID_IMAGES[1] }} style={styles.gridImage} />
              </View>
              <View style={[styles.gridItem, styles.gridItemSmall]}>
                <Image source={{ uri: GRID_IMAGES[2] }} style={styles.gridImage} />
              </View>
            </View>
            <View style={[styles.gridItem, styles.gridItemTall]}>
              <Image source={{ uri: GRID_IMAGES[3] }} style={styles.gridImage} />
            </View>
          </View>
          
          <View style={styles.gridRow}>
            <View style={[styles.gridItem, styles.gridItemMedium]}>
              <Image source={{ uri: GRID_IMAGES[4] }} style={styles.gridImage} />
            </View>
            <View style={[styles.gridItem, styles.gridItemMedium]}>
              <Image source={{ uri: GRID_IMAGES[5] }} style={styles.gridImage} />
            </View>
            <View style={[styles.gridItem, styles.gridItemMedium]}>
              <Image source={{ uri: GRID_IMAGES[6] }} style={styles.gridImage} />
            </View>
          </View>

          <View style={styles.gridRow}>
            <View style={[styles.gridItem, styles.gridItemWide]}>
              <Image source={{ uri: GRID_IMAGES[7] }} style={styles.gridImage} />
            </View>
            <View style={[styles.gridItem, styles.gridItemMedium]}>
              <Image source={{ uri: GRID_IMAGES[8] }} style={styles.gridImage} />
            </View>
          </View>

          {/* Pagination Dots */}
          <View style={styles.pagination}>
            <View style={[styles.dot, styles.dotActive]} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>

        {/* Text Content */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>Easy way to</Text>
          <Text style={styles.title}>book your hotel</Text>
          <Text style={styles.title}>with us!</Text>
          
          <Text style={styles.subtitle}>Also book flight ticket,</Text>
          <Text style={styles.subtitle}>places, food and many more.</Text>
        </View>

        {/* Get Started Button */}
        <Pressable 
          style={styles.button}
          onPress={handleGetStarted}
          android_ripple={{ color: Colors.primaryDark }}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </Pressable>
      </View>

      {/* Bottom Navigation Placeholder */}
      <View style={[styles.bottomNav, { paddingBottom: insets.bottom + 8 }]}>
        <Pressable style={styles.navItem}>
          <View style={styles.navIcon}>
            <View style={styles.homeIcon} />
          </View>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={styles.navIcon}>
            <View style={styles.heartIcon} />
          </View>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={styles.navIcon}>
            <View style={styles.calendarIcon} />
          </View>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={styles.navIcon}>
            <View style={styles.chatIcon} />
          </View>
        </Pressable>
        <Pressable style={styles.navItem}>
          <View style={styles.navIcon}>
            <View style={styles.profileIcon} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
  content: {
    flex: 1,
    paddingHorizontal: 40,
    paddingTop: 20,
  },
  // Grid
  gridContainer: {
    marginBottom: 40,
  },
  gridRow: {
    flexDirection: 'row',
    marginBottom: GRID_SPACING,
    gap: GRID_SPACING,
  },
  gridColumn: {
    gap: GRID_SPACING,
  },
  gridItem: {
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    backgroundColor: Colors.gray,
  },
  gridItemTall: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH * 2 + GRID_SPACING,
  },
  gridItemSmall: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH,
  },
  gridItemMedium: {
    width: COLUMN_WIDTH,
    height: COLUMN_WIDTH,
  },
  gridItemWide: {
    width: COLUMN_WIDTH * 2 + GRID_SPACING,
    height: COLUMN_WIDTH,
  },
  gridImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  // Pagination
  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.border,
  },
  dotActive: {
    backgroundColor: Colors.warning,
    width: 24,
  },
  // Text
  textContainer: {
    marginBottom: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: FontWeight.bold,
    color: Colors.textPrimary,
    lineHeight: 36,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  // Button
  button: {
    backgroundColor: Colors.primary,
    paddingVertical: 16,
    borderRadius: BorderRadius.lg,
    alignItems: 'center',
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  buttonText: {
    fontSize: FontSize.lg,
    fontWeight: FontWeight.semibold,
    color: Colors.white,
  },
  // Bottom Navigation
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: Colors.surface,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  navItem: {
    padding: 8,
  },
  navIcon: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeIcon: {
    width: 20,
    height: 20,
    backgroundColor: Colors.primary,
    borderRadius: 4,
  },
  heartIcon: {
    width: 20,
    height: 18,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    borderRadius: 10,
    transform: [{ rotate: '45deg' }],
  },
  calendarIcon: {
    width: 18,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    borderRadius: 4,
  },
  chatIcon: {
    width: 20,
    height: 18,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    borderRadius: 10,
  },
  profileIcon: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: Colors.textMuted,
    borderRadius: 10,
  },
});
