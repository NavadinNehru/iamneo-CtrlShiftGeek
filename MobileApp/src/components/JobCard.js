import { StyleSheet, Text, View,Image, TouchableOpacity} from 'react-native'
import React from 'react'
import jobicon from '../assets/images/jobicon.png';
import bookmark from '../assets/images/bookmark.png';
import threedot from '../assets/images/threedot.png';
import Bookmark from '../assets/icons/Bookmark.svg';
import Threedot from '../assets/icons/Threedot.svg';
import Dot from '../assets/icons/Dot.svg';
import CircleCheck from "../assets/icons/CircleCheck.svg"

function convertDateToText(date){
  // console.log(date)
  let newDate = new Date(date) ;
  // if(! newDate){
  //   return ""
  // }
  const time = new Date().getTime() - newDate.getTime() ;
  // console.log(time) ;
  if( time < 60*1000){
    return "recently"
  }
  else if(time < 60*60*1000) return Math.floor(time /(60*1000) )+ " minute ago"
  else if(time < 24*60*60*1000) return Math.floor(time /(60*60*1000 ))+ " hour ago"
  else  return Math.floor(time /(24*60*60*1000) )+ " days ago"
}

const JobCard = (props) => {
  return (
    <>
                <TouchableOpacity style={styles.card} className= "mt-[12px] w-full" onPress={props.onPress}>
                <View className="" style={{flexDirection:'row',justifyContent:'flex-start'}}>
                <Image className="w-[40px] h-[40px] mt-[4px]" source={{ uri: props.companyImage }} style={styles.jobicon}/>
                <View className="ml-[12px]" style={{flexDirection:'column'}}>
                    <Text className=" text-[14px] font-[500] leading-[20px] text-left" style={[styles.title,styles.font]}>{props.jobTitle}</Text>
                    <View className="mt-[3.7px]" style={{flexDirection:'row',alignItems:'center',}}>
                      <Text className="pr-[6px] text-[12px] font-[400] leading-[16px] text-left" style={[styles.sub1,styles.font]}>{props.companyName}</Text>
                      <Dot style={{marginBottom:3}}/>
                      <Text className="pl-[6px]  text-[12px] font-[400] leading-[16px] text-left" style={[styles.sub2,styles.font]}>{props.duration}d</Text>
                    </View>
                    <Text className="mt-[2px] text-[10px] font-[400] leading-[14px] text-left" style={[styles.sub2,styles.font]}>{props.jobLocation}</Text>
                    {props?.applied && props?.applicationStatus === 'Pending' && 
                      (<View className= "mt-2 px-2 py-1 border border-[#DEDEDE] rounded-2xl flex-row gap-x-0.5 items-start justify-start ">
                        <CircleCheck fill={'#6CB898'} width={20} height={20} />
                    <Text className= "text-[12px] text-[#1A2233] font-normal font-helvetica-neue ">{`Application viewed ${convertDateToText(props.appliedDate)}`}</Text>
                    </View>)
                    }
                    {props?.applied && props?.applicationStatus === 'Rejected' && 
                      (<View className= "mt-2 px-2 py-1 border border-[#DEDEDE] bg-[#F1E2E2] rounded-2xl flex-row gap-x-0.5 items-start justify-start ">
                    <Text className= "text-[12px] text-[#D40000] font-normal font-helvetica-neue ">Not Selected By Employer</Text>
                    </View>)
                    }
                </View>
                </View>
                <View className=" gap-[16px]" style={{flexDirection:'row',}}>
                    <TouchableOpacity style={{marginRight:0}}>
                    <Bookmark  />
                    </TouchableOpacity>
                    <TouchableOpacity style={{marginRight:0}}>
                    <Threedot  />
                    </TouchableOpacity>
                </View>


            </TouchableOpacity>
                    <View className="mt-[12px]" style={styles.line}></View>
    </>
  )
}

export default JobCard

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Helvetica Neue',
  },
    card:{
        // marginTop:18,
        flexDirection:'row',
        justifyContent:'space-between',

      },
      jobicon:{
        // width:45,
        // height:45,
        // borderRadius:50,
        // marginTop:10,
      },
      title:{
        color:'black',
        // fontSize:18,
        // fontWeight:'600'
      },
      sub1:{
        color:'#1A2233',
        // fontSize:14,
        // fontWeight:'400'
      },
      sub2:{
        color:'#1A2233',
        // fontSize:11,
      },
    //   bookmark:{
    //     height:18,
    //     width:15,
    // },
    // threedot:{
    //       height:18,
    //       width:15,
    //   },
      line:{
        // marginTop:10,
        width:'85%',
        alignSelf:'flex-end',
        borderBottomWidth:1.5,
        opacity:0.5,
        borderColor:'#F2F2F2',
      }
})