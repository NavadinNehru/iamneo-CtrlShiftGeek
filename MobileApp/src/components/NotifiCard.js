import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'

const Marker = ({ visible }) => {
  return visible ? (
    <View 
      style={{
        backgroundColor: '#2E6BE5',
        position: 'absolute',
        top: 0,
        right: 0,
      }} 
      className="w-[8px] h-[8px] rounded-[8px]"
    />
  ) : null;
};

const NotifiCard = ({ title, message, timeAgo, markerVisible }) => {
  return (
    <View 
      className="mb-[12px]" 
      style={{ flexDirection: 'row', width: '100%' }}
    >
      <Marker visible={markerVisible} />
      <Image 
        className="w-[40px] h-[40px] rounded-[40px]" 
        source={{ uri: 'https://cultivatedculture.com/wp-content/uploads/2019/12/LinkedIn-Profile-Picture-Example-Madeline-Mann.jpeg' }} 
      />
      <View style={{ flexDirection: 'column' }}>
        <View className="ml-[13px] pr-[16px]" style={{ flexDirection: 'column', width: '90%' }}>
          <Text style={styles.font} className="text-[14px] font-medium leading-[20px] text-black">
            {title}
          </Text>
          <Text style={styles.font} className="text-[12px] mt-[3px] font-normal leading-[16px] text-[#1A2233]">
            {message}
          </Text>
          <Text style={styles.font} className="mt-[2px] text-[10px] font-normal leading-[14px] text-[#6D747A]">
            {timeAgo}
          </Text>
        </View>
        <View className="h-[1px] rounded-[1px] mt-[12px]" style={{ backgroundColor: '#F2F2F2', width: '90%',  alignSelf:'center'}}></View>
      </View>
    </View>
  );
}

export default NotifiCard;

const styles = StyleSheet.create({
  font: {
    fontFamily: 'Helvetica Neue',
  },
});
