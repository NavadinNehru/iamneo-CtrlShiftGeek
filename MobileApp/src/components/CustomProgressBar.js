import React from 'react';
import { View, StyleSheet } from 'react-native';

const CustomProgressBar = ({ progress }) => {
  return (
    <View style={styles.progressBarContainer} className="mt-[12px] h-[4px] w-[164px] rounded-[2px]">
      <View style={[styles.progressBar, { width: `${progress * 100}%` }]} />
    </View>
  );
};

const styles = StyleSheet.create({
  progressBarContainer: {
    alignSelf:'center',
    // height: 8, // Adjust the height based on the desired thickness of the progress bar
    backgroundColor: '#DBE7FF', // Light blue background (the unfilled part)
    // borderRadius: 50, // Rounds the edges
    overflow: 'hidden', // Ensure progress bar doesn't spill over the edges
  },
  progressBar: {
    height: '100%', // Take full height
    backgroundColor: '#2E6BE5', // The blue fill color
    borderRadius: 50, // Match the container for rounded progress edges
  },
});

export default CustomProgressBar;
