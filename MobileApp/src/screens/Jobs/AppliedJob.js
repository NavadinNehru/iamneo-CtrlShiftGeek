import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useRef, useState } from 'react'
import { FlatList, SafeAreaView, ScrollView, Text, TouchableOpacity, View, Image, StyleSheet } from 'react-native'
import J1 from '../../assets/icons/J1.svg';
import J2 from '../../assets/icons/J2.svg';
import J3 from '../../assets/icons/J3.svg';
import J4 from '../../assets/icons/J4.svg';
import CircleCheck from '../../assets/icons/CircleCheck.svg';
import JobCard from '../../components/JobCard'
import JobModal from '../../components/JobModal'
import { Svg , Text as SvgText , Rect ,Defs, LinearGradient, Stop } from 'react-native-svg';

function convertDateToText(date){
  console.log(date)
  let newDate = new Date(date) ;
  // if(! newDate){
  //   return ""
  // }
  const time = new Date().getTime() - newDate.getTime() ;
  console.log(time) ;
  if( time < 60*1000){
    return "recently"
  }
  else if(time < 60*60*1000) return Math.floor(time /(60*1000) )+ " minute ago"
  else if(time < 24*60*60*1000) return Math.floor(time /(60*60*1000 ))+ " hour ago"
  else  return Math.floor(time /(24*60*60*1000) )+ " days ago"
}

const JobData = [
  {id:1 ,applied : true , appliedDate : new Date(new Date() - 7*24*3600*1000).toISOString() , applicationStatus : 'Pending' } , 
  {id:2 ,applied : true , appliedDate : new Date(new Date() - 14*24*3600*1000) , applicationStatus : 'Pending' } , 
  {id:3 ,applied : true , appliedDate : new Date(new Date() - 7*24*3600*1000).toISOString() , applicationStatus : 'Rejected' } , 
  {id:4 ,applied : true , appliedDate : new Date(new Date() - 14*24*3600*1000).toISOString() , applicationStatus : 'Rejected' } 
]

const interViewBtn = ()=> (
  <Svg width={"100%"} height={44}>
    <Rect id="rect" x={1} width={"99%"} height={42}  stroke={"url(#gradient-fill)"} strokeWidth={1} fill={"white"} rx={8} >
    </Rect>
      <SvgText id = "textGrad" x={"25%"} y={25} fontWeight={'400'} fontFamily='helvetica neue' fontSize = {14}  stroke={"url(#gradient-fill)"}>Prepare for interview with AI.</SvgText>
    <Defs>
    <LinearGradient id="gradient-fill" x1="0" y1="0" x2="100%" y2="0" gradientUnits="userSpaceOnUse">
    <Stop offset="0" stopColor="#9068c1" />
						
            <Stop offset="0.14285714285714285" stopColor="#8f69c2" />
          
            <Stop offset="0.2857142857142857" stopColor="#896ec8" />
          
            <Stop offset="0.42857142857142855" stopColor="#767cd5" />
          
            <Stop offset="0.5714285714285714" stopColor="#4e91e1" />
          
            <Stop offset="0.7142857142857143" stopColor="#2e9ce3" />
          
            <Stop offset="0.8571428571428571" stopColor="#1ea0e3" />
          
            <Stop offset="1" stopColor="#1ba1e3" />
    </LinearGradient>
    </Defs>
  </Svg>
)

function AppliedJob() {
  const [jobData , setJobData] = useState(null)
  const mainModalRef = useRef(null) ;

  return (
    <SafeAreaView className = " flex-1 bg-white">
      <FlatList 
       data={JobData}
       keyExtractor={(item) => item.id}
       contentContainerStyle = {{
        paddingHorizontal: 16, 
        paddingTop: 14 ,
        width: "100%"
       }}
       renderItem={({item}) =>(
          <JobCard 
          companyImage = {"https://w7.pngwing.com/pngs/332/615/png-transparent-phonepe-india-unified-payments-interface-india-purple-violet-text.png"}
          jobTitle= 'Senior Python Developer' 
          companyName = 'PhonePe'
          duration = '2'
          jobLocation = 'Bangalore, KA'
          applicationStatus = {item.applicationStatus}
          applied = {item.applied}
          appliedDate = {item.appliedDate}
          onPress = {()=>{
            setJobData(item) ;
            mainModalRef.current.present() ;
          }}
          />
  )}
      />
    <JobModal
        ref={mainModalRef}
        onPress={()=>{}}
        buttonText='Applied'
        buttonDisable = {true}
        extraFooter= {interViewBtn()}
      >
        {/* <> */}

        <View className="mt-[36px] pb-[90]" style={{flexGrow:1,width:'100%'}}>
          
          {jobData && (
            <>
              <View className="pl-[16px] pr-[16px]" style={{ flexDirection: 'column' }}>

                <View style={{ flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-start' }}>
                  <Image className="w-[32px] h-[32px]" source={{ uri: "https://w7.pngwing.com/pngs/332/615/png-transparent-phonepe-india-unified-payments-interface-india-purple-violet-text.png" }} style={{}} />
                  <Text className="text-[16px] font-[400] leading-[22px] text-left ml-[8px] mt-[5px] text-[#1A2233] ">PhonePe</Text>
                </View>
                <View className="mt-[16px]" style={{ flexDirection: 'column', width:"100%" }}>
                  <Text className="font-helvetica-neue text-[20px] font-bold leading-[24px] text-left text-black">Senior Python Developer</Text>
                  <Text className="font-helvetica-neue text-[12px] font-normal leading-[16px] text-left mt-[4px] text-[#999999] " >Remote | 1 Week ago</Text>
                  <View style={{flexDirection:'row'}}>

                  {jobData?.applied && jobData?.applicationStatus === 'Pending' && 
                      (<View className= " mt-2 px-2 py-1 border border-[#DEDEDE] rounded-2xl flex-row gap-x-0.5 ">
                        <CircleCheck fill={'#6CB898'} width={20} height={20} />
                    <Text className= "text-[12px]  text-[#1A2233] font-normal font-helvetica-neue ">{`Application viewed ${convertDateToText(jobData.appliedDate)}`}</Text>
                    </View>)
                    }
                    {jobData?.applied && jobData?.applicationStatus === 'Rejected' && 
                      (<View className= "mt-2 px-2 py-1 border border-[#DEDEDE] bg-[#F1E2E2] rounded-2xl  gap-x-0.5 items-start justify-start  ">
                    <Text className= "text-[12px] text-[#D40000] font-normal font-helvetica-neue ">Not Selected By Employer</Text>
                    </View>)
                    }
                    </View>
                </View>
                <View className="mt-[24px]" style={{ flexDirection: 'column' }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <J1 />
                    <Text className="ml-[8px] font-helvetica-neue text-[14px] font-normal leading-[20px] text-left" style={[{ color: '#737780' }, ]}>1-2 Years</Text>
                  </View>
                  <View className="mt-[14px] flex-row items-center" >
                    <J2 />
                    <Text className="ml-[8px] font-helvetica-neue text-[14px] font-normal leading-[20px] text-left text-[#737780]">Bangalore</Text>
                  </View>
                  <View className="mt-[14px] flex-row items-center">
                    <J3 />
                    <Text className="ml-[8px] font-helvetica-neue text-[14px] font-normal leading-[20px] text-left text-[#737780]">5L - 7L</Text>
                  </View>
                  <View className="mt-[14px]" style={{ flexDirection: 'row', alignItems: 'center', }}>
                    <J4 />
                    <Text className="ml-[8px] font-helvetica-neue text-[14px] font-normal leading-[20px] text-left text-[#737780]" >12 applicants</Text>
                  </View>
                </View>
                <View className="mt-[24px]" style={{ flexDirection: 'column' }}>
                  <Text className="font-helvetica-neue text-[14px] font-medium leading-[20px] text-left" style={[{ color: 'black' }]}>About the job</Text>
                  <Text className="mt-[4px] font-helvetica-neue text-[14px] font-[400] leading-[20px] text-left text-[#939CA3]" >
                    This course is designed to provide students with a compre-hensive understanding of the nods js framework for the be apple’s most flexible desktop computer. Sure, most people go for the traditional experience and plug in a display, mouse, and keyboard — but you can also have it serve as a home theatre PC, or put it to work with professional photo or audio editing, or turn a group of minis into a server farm. Apple opened new possibilities for the mini with the big upgrade it got in 2018, and two years later, it’s one of the first three Macs to transition away from Intel processors and showcase the potential of Apple silicon and the M1 chip.
                  </Text>
                </View>
              </View>
            </>
          )}
        </View>
          {/* </> */}
      </JobModal>

    </SafeAreaView>
  )
}



export default AppliedJob