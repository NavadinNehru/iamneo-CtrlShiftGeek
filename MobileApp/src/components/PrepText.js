import { StyleSheet, Text, View,TouchableOpacity } from 'react-native'
import React from 'react'

const PrepText = (props) => {
  return (
    <View className="mt-[24px]" style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
    <View style={{flexDirection:'column'}}>
        <Text className=" text-[14px] font-[500] leading-[20px] text-left" style={[{color:'black'},styles.font]}>{props.title}</Text>
        <Text className="mt-[2px] text-[10px] font-[400] leading-[14px] text-left" style={[{color:'black'},styles.font]}>Basic problem solving</Text>
    </View>
    <TouchableOpacity className="rounded-[8px]" style={{borderWidth:1,borderColor:'#1A2233',justifyContent:'center',alignItems:'center',backgroundColor:'#FAFAFA'}} onPress={props.onPressPrep}>
        <Text className="pt-[8px] pb-[8px] pl-[16px] pr-[16px] text-[12px] font-[400] text-left" style={[{color:'black'},styles.font]} >Solve Problem</Text>
    </TouchableOpacity>
</View>
  )
}

export default PrepText

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Helvetica Neue',
  },
})