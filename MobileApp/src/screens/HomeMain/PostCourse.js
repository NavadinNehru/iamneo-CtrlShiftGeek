import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import CourseMaterial from '../CourseMaterial/CourseMaterial';
import Certificate from '../Certificate/Certificate';
import ContactUs from '../ContactUs/ContactUs';
import Resources from '../Resources/Resources';
import ThreeDotModal from '../../components/modal/ThreeDotModal';
import HeaderComp from '../../components/HeaderComp';

const PostCourse = () => {
  const [activeTab, setActiveTab] = useState('Tab1');
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = (visible) => {
    setModalVisible(visible);
  };

  const options = [
    { label: 'Share', action: () => console.log('Share pressed') },
    { label: 'Feedback', action: () => console.log('Feedback pressed') },
    { label: 'Download Settings', action: () => console.log('Download Settings pressed') },
  ];

  return (
    <>
      <View style={styles.container}>
        <HeaderComp toggleModal={toggleModal} />

        <View style={{ overflow: 'hidden', paddingBottom: 5 }}>
          <ScrollView
          style={{
            // borderWidth:1,
            // borderColor:'black',
            backgroundColor: '#fff',
            shadowColor: '#000000',
            shadowOffset: { width: 1, height: 1 },
            shadowOpacity:  0.04,
            shadowRadius: 1,
            elevation: 3,
          }}
          className="h-[48px]"
            contentContainerStyle={styles.topBar}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
          >
            <TouchableOpacity
            className="ml-[12px] pt-[14px] "
              style={[styles.tab, activeTab === 'Tab1' && styles.activeTab]}
              onPress={() => setActiveTab('Tab1')}
            >
              <Text className="text-left text-[12px] leading-[16px] font-[400] pl-[12px] pr-[12px]" style={[styles.tabText, activeTab === 'Tab1' && styles.activeText,styles.font]}>
                Course Material
              </Text>
              {
                activeTab === 'Tab1' ?(
                  <View className="h-[2px] w-[97px] rounded-t-[4px]" style={{backgroundColor:'#1A2233'}}></View>
                ):(
                  <View className="h-[2px] w-[97px] rounded-t-[4px]" style={{backgroundColor:'transparent'}}></View>
                )
              }
            </TouchableOpacity>
            <TouchableOpacity
            className="ml-[9px] pt-[14px]"
              style={[styles.tab, activeTab === 'Tab2' && styles.activeTab]}
              onPress={() => setActiveTab('Tab2')}
            >
              <Text className="text-left text-[12px] leading-[16px] font-[400] pl-[12px] pr-[12px]" style={[styles.tabText, activeTab === 'Tab2' && styles.activeText,styles.font]}>
                Resources
              </Text>
              {
                activeTab === 'Tab2' ?(
                  <View className="h-[2px] w-[71px] rounded-t-[4px]" style={{backgroundColor:'#1A2233'}}></View>
                ):(
                  <View className="h-[2px] w-[71px] rounded-t-[4px]" style={{backgroundColor:'transparent'}}></View>
                )
              }
            </TouchableOpacity>
            <TouchableOpacity
            className="ml-[9px] pt-[14px]"
              style={[styles.tab, activeTab === 'Tab3' && styles.activeTab]}
              onPress={() => setActiveTab('Tab3')}
            >
              <Text className="text-left text-[12px] leading-[16px] font-[400] pl-[12px] pr-[12px]" style={[styles.tabText, activeTab === 'Tab3' && styles.activeText,styles.font]}>
                Certificate
              </Text>
              {
                activeTab === 'Tab3' ?(
                  <View className="h-[2px] w-[71px] rounded-t-[4px]" style={{backgroundColor:'#1A2233'}}></View>
                ):(
                  <View className="h-[2px] w-[71px] rounded-t-[4px]" style={{backgroundColor:'transparent'}}></View>
                )
              }
            </TouchableOpacity>
            <TouchableOpacity
            className="ml-[9px] pt-[14px] pr-[15px]"
              style={[styles.tab, activeTab === 'Tab4' && styles.activeTab]}
              onPress={() => setActiveTab('Tab4')}
            >
              <Text className="text-left text-[12px] leading-[16px] font-[400] pl-[12px] pr-[12px]" style={[styles.tabText, activeTab === 'Tab4' && styles.activeText,styles.font]}>
                Contact Us
              </Text>
              {
                activeTab === 'Tab4' ?(
                  <View className="h-[2px] w-[71px] rounded-t-[4px]" style={{backgroundColor:'#1A2233'}}></View>
                ):(
                  <View className="h-[2px] w-[71px] rounded-t-[4px]" style={{backgroundColor:'transparent'}}></View>
                )
              }
            </TouchableOpacity>
          </ScrollView>
          {/* <View style={{ overflow: 'hidden', paddingBottom: 5 }}> */}
    {/* <View
      style={{
        backgroundColor: '#fff',
        width: 300,
        height: 60,
        shadowColor: '#000',
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity:  0.4,
        shadowRadius: 3,
        elevation: 5,
      }} 
    />
  </View> */}
          {/* <View style={styles.shadow}></View> */}
        </View>

        <View style={[styles.content]}>
          {activeTab === 'Tab1' && <CourseMaterial />}
          {activeTab === 'Tab2' && <Resources />}
          {activeTab === 'Tab3' && <Certificate />}
          {activeTab === 'Tab4' && <ContactUs />}
        </View>

        <ThreeDotModal
          modalVisible={modalVisible}
          toggleModal={toggleModal}
          optionList={options}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Helvetica Neue',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tab: {
    // paddingVertical: 10,
    alignItems: 'center',
    flexDirection:'column',
    // gap:20,
    justifyContent:'space-between'
  },
  tabText: {
    color: '#999999',
  },
  activeText: {
    color: '#1A2233',
  },
  activeTab: {
    // borderBottomWidth: 2.5,
    // borderBottomStartRadius: 10,
    // borderBottomEndRadius: 10,
    // borderBottomColor: '#1A2233',
  },
  content: {
    flex: 1,
  },
  line: {
    height: 2,
    opacity: 0.7,
    backgroundColor: '#00000008',
  },
  // shadow: {
  //   // backgroundColor:'grey',
  //   // opacity:0.5,
  //   // height:1,
  //   shadowOffset: {sha},  // Positive height for bottom shadow
  //   shadowColor: 'black',
  //   backgroundColor: 'white',
  //   shadowOpacity: 0.5,
  //   shadowRadius: 5,
  //   elevation: 2,  // Ensure this is consistent with the shadow effect on Android
  // },
  
});

export default PostCourse;
