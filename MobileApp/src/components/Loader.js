import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient)
const Loader = () => {
  return (
    <View style={styles.container}>
    <ShimmerPlaceholder style={styles.shimmerText} />
    <ShimmerPlaceholder style={styles.shimmerImage} />
    <ShimmerPlaceholder style={styles.shimmerText} />
    <ShimmerPlaceholder style={styles.shimmerButton} />
    <View style={styles.border}></View>
    <ShimmerPlaceholder style={styles.shimmerText} />
    <ShimmerPlaceholder style={styles.shimmerImage} />
    <ShimmerPlaceholder style={styles.shimmerImage} />
    <ShimmerPlaceholder style={styles.shimmerImage} />
  </View>
  )
}

export default Loader

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: 20,
      },
      shimmerText: {
        width: '80%',
        height: 20,
        marginVertical: 10,
      },
      shimmerImage: {
        width: '100%',
        height: 200,
        marginVertical: 10,
      },
      shimmerButton: {
        width: '100%',
        height: 50,
        marginVertical: 10,
      }

})