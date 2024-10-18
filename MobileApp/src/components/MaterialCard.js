import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import React from 'react'
import Dot from '../assets/icons/Dot.svg';
const MaterialCard = (props) => {
  return (
    <TouchableOpacity className={props.duration?"mt-[16px]":"mb-[20px]"} style={styles.box1} onPress={props.onPress}>
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
          <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
          {props.start}
          <View className="ml-[12px]" style={{flexDirection:'column'}}>
            <Text className=" text-[14px] font-[500] leading-[20px] text-left" style={[styles.text,styles.font]}>{props.title}</Text>
            {
              props.duration?(
                <View style={{flexDirection:'row',alignItems:'center',justifyContent:'center',alignSelf:'flex-start'}}>
                <Text className=" text-[12px] font-[400] leading-[16px] text-[#6D747A] mr-[8px]" style={[styles.p,styles.font]}>{props.sub}</Text>
                <Dot style={{alignSelf:'center',marginBottom:3.5,width:3,height:3,paddingTop:6.5,paddingBottom:6.5}}/>
                <Text className=" text-[12px] font-[400] leading-[16px] text-[#6D747A] ml-[8px]" style={[styles.p,styles.font]}>{props.duration?props.duration:null}</Text>
                </View>
              ):null
            }
          </View>
          </View>
          <TouchableOpacity style={styles.but} onPress={props.downloadPress}>
            {props.end}
          </TouchableOpacity>
        </View>
        <View>

        </View>
        {/* <View className={props.duration?"mt-[20px]":"mt-[22px]"} style={styles.line}></View> */}
      </TouchableOpacity>
  )
}

export default MaterialCard

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Helvetica Neue',
  },
    box1:{
        flexDirection:'column',
        // gap:15,
        width:'98%'
      },
      tit:{
        color:'grey',
        fontSize:14,
      },
      text:{
        color:'black',
        // fontWeight:'700',
        // fontSize:15,
        // width:240,
      },
      p:{
        color:'#6D747A',
        // fontSize:12,
      },
      but:{
      },
      line:{
        backgroundColor:'#F2F2F2',
        height:1,
        width:'90%',
        alignSelf:'flex-end',
        // marginTop:-15
      }
})