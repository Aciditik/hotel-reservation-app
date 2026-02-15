import React, { useState } from 'react';
import { View, Image, StyleSheet, Pressable, ScrollView, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Icon } from '../atoms/Icon';
import { Colors, BorderRadius, Spacing } from '../../constants/theme';

interface ImageGalleryProps {
  images: string[];
  onAddImage?: (uri: string) => void;
}

const { width } = Dimensions.get('window');

export const ImageGallery: React.FC<ImageGalleryProps> = ({ images, onAddImage }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to add photos!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.8,
    });

    if (!result.canceled && onAddImage) {
      onAddImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        onMomentumScrollEnd={(event) => {
          const index = Math.round(event.nativeEvent.contentOffset.x / width);
          setSelectedIndex(index);
        }}
      >
        {images.map((image, index) => (
          <Image key={index} source={{ uri: image }} style={styles.image} />
        ))}
      </ScrollView>
      
      <View style={styles.pagination}>
        {images.map((_, index) => (
          <View
            key={index}
            style={[styles.dot, selectedIndex === index && styles.activeDot]}
          />
        ))}
      </View>

      {onAddImage && (
        <Pressable style={styles.addButton} onPress={pickImage}>
          <Icon name="camera" size={22} color={Colors.textDark} />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: 320,
  },
  image: {
    width,
    height: 320,
  },
  pagination: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.35)',
  },
  activeDot: {
    backgroundColor: Colors.primary,
    width: 24,
  },
  addButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    padding: 12,
  },
});
