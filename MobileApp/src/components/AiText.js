import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import ai from '../assets/images/ai.png';

const AiText = (props) => {
  return (
    <View style={styles.container}>
      <Image source={ai} style={styles.aii}/>
      <Text style={[styles.title,styles.font]} className="text-[10px] font-[400] leading-[14px] text-left mt-[7px]">{props.title}</Text>
    </View>
  );
};

export default AiText;

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Helvetica Neue',
  },
  container: {
    alignItems:'center',
    flexDirection:'row',
    borderRadius: 25,
    backgroundColor: '#edf3f9',
    alignSelf:'flex-start',
  },
  aii: {
    width: 16,
    height: 16,
    marginLeft:8,
    marginVertical:5,
},
title:{
    // fontSize:14,
    color:'black',
    marginLeft:3,
    marginRight:10,
    marginVertical:5,
  }
});
