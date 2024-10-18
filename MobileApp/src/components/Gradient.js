import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect,useState} from 'react'
import LinearGradient from 'react-native-linear-gradient';

const Gradient = () => {
    const colors = ['#fcfaf2','#fff8dd','#fff5c6','#eaf6fc','#e0f4ff', '#d3f0ff','#faeffc','#f8e3fc', '#f7e1fb',]; // Define your array of colors
  const [colorIndex, setColorIndex] = useState(0);
  const [colorIndex1, setColorIndex1] = useState(0);

 
  useEffect(() => {
    const interval = setInterval(() => {
      setColorIndex(prevIndex => (prevIndex + 1) % colors.length);
    }, 2000);
    const interval1 = setInterval(() => {
      setColorIndex1(prevIndex => (prevIndex + 1) % colors.length);
    }, 2500);

    return () => {
      clearInterval(interval);
      clearInterval(interval1);
    };
  }, [colors.length]);
  
  return (
    <View style={styles.gradientContainer}>
      <LinearGradient
            colors={[colors[colorIndex1], colors[colorIndex], colors[colorIndex1], colors[colorIndex]]}
            style={styles.gradient}>
              </LinearGradient>
        {/* <LinearGradient
          colors={[colors[colorIndex1], colors[colorIndex], colors[colorIndex1], colors[colorIndex]]}
          style={styles.overlay}>

          </LinearGradient> */}

            
      </View>
  )
}

export default Gradient

const styles = StyleSheet.create({
    gradientContainer: {
        zIndex:-1,
      },
      gradientImage: {
        borderRadius: 500,
      },
      gradient:{
        position:'absolute',
        top:-300,
        left:'2%',
        borderBottomLeftRadius:500,
        borderBottomRightRadius:400,
        height:325,
        width:275,
        zIndex:2,
        opacity:0.18,
        },
        overlay: {
          position: 'absolute',
          top: -190,
          left: '3%',
          borderBottomLeftRadius:500,
        borderBottomRightRadius:300,
          height: 305,
          width: 305,
          zIndex: 2,
          opacity:0.15,
      },
})