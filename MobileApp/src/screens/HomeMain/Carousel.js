import React, { useEffect, useRef, useState } from 'react';
import { View, Text, Image, FlatList, Dimensions, StyleSheet } from 'react-native';

const { width } = Dimensions.get('window');

const Carousel = ({ data }) => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-scroll setup
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % data.length;
        flatListRef.current.scrollToIndex({ animated: true, index: nextIndex });
        return nextIndex;
      });
    }, 3000); // Auto scroll every 3 seconds

    return () => clearInterval(intervalId); // Clean up interval on unmount
  }, [data.length]);

  // Handle manual scroll and update index
  const onScrollEnd = (e) => {
    const horizontalOffset = e.nativeEvent.contentOffset.x;
    const index = Math.floor(horizontalOffset / width);
    setCurrentIndex(index);
  };

  // Render each item in the carousel
  const renderItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Image source={item.image} style={styles.image} />
      <Text style={[styles.title,styles.font]}>{item.title}</Text>
      <Text style={[styles.description,styles.font]}>{item.description}</Text>
    </View>
  );

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      renderItem={renderItem}
      horizontal
      pagingEnabled
      showsHorizontalScrollIndicator={false}
      onMomentumScrollEnd={onScrollEnd}
      keyExtractor={(item, index) => index.toString()}
    />
  );
};

export default Carousel;

const styles = StyleSheet.create({
    font:{
        fontFamily: 'Helvetica Neue',
      },
  carouselItem: {
    width,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 10,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
