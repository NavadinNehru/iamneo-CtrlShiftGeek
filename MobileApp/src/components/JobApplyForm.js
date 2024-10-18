import { useAccountContext } from "../hooks/Context";
import { View, Text, Image, TextInput, KeyboardAvoidingView, TouchableOpacity, StyleSheet, Alert } from "react-native";
import Svg, { Rect, Circle,Text as SvgText, G, Path, Defs, ClipPath } from "react-native-svg";
import React, { useState, useEffect } from "react";
import { applyJob, getResume } from "../api/api";
import over from '../assets/images/over.png';
import profile from '../assets/images/profile.png';
import Ja1 from '../assets/icons/Ja1.svg';
import Ja2 from '../assets/icons/Ja2.svg';
import { useUploadResume } from "../api/uploadResume";
import { BottomSheetFlatList as FlatList } from "@gorhom/bottom-sheet";

const onlyNumbers = (str) => str.replace(/[^0-9]/g, '');
const convertDateToString = (date) => {
    const dateObj = new Date(date);
    if (new Date().getTime() - dateObj.getTime() < 1000 * 60) {
        return 'Just now';
    }
    else if (new Date().getTime() - dateObj.getTime() < 1000 * 60 * 60) {
        return `${Math.floor((new Date().getTime() - dateObj.getTime()) / 1000 / 60)} minutes ago`;
    }
    else if (new Date().getTime() - dateObj.getTime() < 1000 * 60 * 60 * 24) {
        return `${Math.floor((new Date().getTime() - dateObj.getTime()) / 1000 / 60 / 60)} hours ago`;
    }
    else {
        const temp = dateObj.toDateString().split(' ')
        return `${temp[2]} ${temp[1]}, ${temp[3]}`;
    }
}
const nameCrop = (str) =>{
    if(typeof str === 'string' && str.length >30  ){
        return str.slice(0,27) + '...' ;
    }
    else return str ;
}
export function JobApplyForm({jobId, selectedResume, setSelectedResume}) {
    const { account, getId } = useAccountContext();
    const [resumeList, setResumeList] = useState([]);
    const [phoneNo , setPhoneNo] = useState(account.phone_number || "");
    const user_id = getId();
    const uploadPDF = useUploadResume(user_id);
    useEffect(()=>{
        getResumeList();
    },[])

    const getResumeList = async () => {
        if (user_id) {
        try {
            const data = await getResume(user_id)
            console.log("getREsume ", data)
            setResumeList(data || []);
            if(data)
            {
                setSelectedResume(data[0].id) ;
            }
        } catch (e) {
            console.log(e);
        }
        }
    }


    return (<>
        <View className='pl-[16px] pr-[16px]'>
            <View className='mt-[38px]' style={{ flexDirection: 'column', alignItems: 'center' }}>
                <Image className="w-[56px] h-[56px] rounded-[56px]" source={profile} />
                <Text className="mt-[8px] text-left text-[16px] font-normal leading-[22px] font-helvetica-neue" style={[{ color: '#000' }, ]}>{`${account.first_name} ${account.last_name}`}</Text>
            </View>
            <KeyboardAvoidingView style={{ flexDirection: 'column', alignItems: 'center' }}>
                <View style={styles.inputContainer1} className="mt-[40px] h-[48px] rounded-[8px]">
                    <View className='pl-[12px] pr-[9px]'>
                        <Ja1 style={styles.icon} />
                    </View>
                    <TextInput
                        className='text-left text-[14px] font-[400] font-normal font-helvetica-neue'
                        value={account.email ? account.email : "youremailname@your.domin"}
                        style={[styles.input, ]}
                        editable={false}
                    />
                </View>
                <View style={styles.inputContainer2} className="mt-[16px] h-[48px] rounded-[8px] font">
                    <View className='pl-[12px] pr-[9px]'>
                        <Ja2 style={styles.icon} />
                    </View>
                    <TextInput
                        className='text-left text-[14px] font-[400] font-normal font-helvetica-neue flex-1'
                        value={phoneNo}
                        autoComplete="cc-number"
                        onChangeText={(text) => setPhoneNo(onlyNumbers(text))}
                        placeholder="Enter your number here"
                        style={[styles.input, ]}
                        keyboardType="numeric"
                        maxLength={10} // Optional: specify the maximum number of digits
                    />
                </View>
            </KeyboardAvoidingView>

            <View style={{ flexDirection: 'column' }}>
                <Text className="mt-[32px] text-[14px] font-[500] leading-[20px] text-left font-helvetica-neue " style={[{ color: 'black' }, ]}>Select your resume</Text>
                {
                    resumeList.length > 0 &&
                    <FlatList
                        data={resumeList}
                        keyExtractor={(item) => item.id}
                        extraData={selectedResume}
                        renderItem={({ item }) => (<View className={`mt-[10px] h-[48px] rounded-[8px] w-full self-center border bg-[#FAFAFA] justify-between flex-row items-center ${item.id === selectedResume ? "border-[#2E6BE5]" : "border-[#1A2233]"}`} >
                            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                                <TouchableOpacity className='pl-[12px] pr-[12px]' onPress={() => { setSelectedResume(item.id) }}>
                                    <Svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <Circle cx="8" cy="8" r="7.5" stroke={item.id === selectedResume ? "#2E6BE5" : "#1A2233"} />
                                        <Circle cx="8" cy="8" r="4" fill={item.id === selectedResume ? "#2E6BE5" : "none"} />
                                    </Svg>
                                </TouchableOpacity>
                                <Text className="text-[16px] font-normal text-left font-helvetica-neue" style={[{ color: '#08090A' }, ]}>{nameCrop(item.name)}</Text>
                            </View>
                            <Text className="pr-[12px] text-[12px] font-normal text-left font-helvetica-neue " style={[{ color: '#6D747A' }, ]}>{convertDateToString(item.uploaded_at)}</Text>

                        </View>)}
                    />}
                <TouchableOpacity className='mt-[16px] h-[48px]' style={{ width: '100%', justifyContent: 'center', alignItems: 'center', alignSelf: 'center' }} onPress={()=>{
                    uploadPDF().then(res =>{
                        if(res){
                            getResumeList() ;
                        }
                    })
                }}>
                    <Svg width="100%" height="49" fill="none" xmlns="http://www.w3.org/2000/svg" >
                    <Rect x="0.5" y="0.5" width="99%" height="48" rx="7.5" fill="white" stroke="#2F6CE5" strokeDasharray="10 4"/>
                    <SvgText x="50%" y="60%" dominantBaseline="middle" textAnchor="middle" fill="#2F6CE5" fontSize="16" fontFamily="Helvetica Neue" fontWeight="400">Upload a new resume</SvgText>
                    <G transform="translate(87,14)" >
                        <G clipPath= "url(#clip0)">
                            <Path d="M14.9999 12.5002V15.0002H4.99992V12.5002H3.33325V15.0002C3.33325 15.9168 4.08325 16.6668 4.99992 16.6668H14.9999C15.9166 16.6668 16.6666 15.9168 16.6666 15.0002V12.5002H14.9999ZM5.83325 7.50016L7.00825 8.67516L9.16659 6.52516V13.3335H10.8333V6.52516L12.9916 8.67516L14.1666 7.50016L9.99992 3.3335L5.83325 7.50016Z"
                            fill="#2F6CE5"/>
                        </G>
                        <Defs>
                            <ClipPath id="clip0">
                                <Rect width="20" height="20" fill="white" />
                            </ClipPath>
                        </Defs>
                    </G>
                    </Svg>
                </TouchableOpacity>
            </View>

        </View>

        {/* <View className="pl-[16px] pr-[16px]" style={{
            width: '100%',
            position: 'absolute',
            bottom: 0,
            zIndex: 5,
            backgroundColor: 'white',
            shadowColor: 'black',
            shadowOffset: { width: 5, height: 50 },
            shadowOpacity: 1,
            shadowRadius: 5,
            elevation: 20,
            alignItems: 'center',
            justifyContent: 'center',
            // paddingVertical: 10,
        }}>
            <TouchableOpacity className="rounded-[8px] mt-[8px] mb-[8px] " style={{
                backgroundColor: '#1A2233',
                // borderRadius: 10,
                width: '100%',
                alignItems: 'center',
                // paddingVertical: 12,
            }}
                onPress={handleApplyJob}
            >
                <Text className="text-white font-normal text-[14px] leading-[20px] pt-[10px] pb-[10px]" style={{
                    // color: 'white',
                    // fontSize: 14,
                    // fontFamily: 'Helvetica Neue',
                    // fontWeight: '400',
                    // lineHeight: 20,
                }}>
                    Apply
                </Text>
            </TouchableOpacity>
        </View> */}
    </>)
}

const styles = StyleSheet.create({
    
  inputContainer1: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A2233',
    // borderRadius: 8,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // marginBottom: 10,
    width: '100%',
    backgroundColor: '#CCCCCC'
  },
  inputContainer2: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#1A2233',
    // borderRadius: 8,
    // paddingHorizontal: 10,
    // paddingVertical: 5,
    // marginBottom: 10,
    width: '100%',
    backgroundColor: '#FAFAFA',
  },
  icon: {
    // marginRight: 6,
  },
  input: {
    // flex: 1,
    color: '#1A2233',
    // alignSelf:'center'
  }
})