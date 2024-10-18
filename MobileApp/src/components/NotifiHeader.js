import React from 'react';
import { View, TouchableOpacity, StyleSheet,Text } from 'react-native';
import Back from '../assets/icons/Back.svg';
import Threedot from '../assets/icons/Threedot.svg';
import { useNavigation } from '@react-navigation/native';
import Noti from '../assets/icons/Noti.svg';
const NotifiHeader = ({ toggle }) => {
  const navigation = useNavigation();

  return (
    <View className="h-[52px]" style={styles.header}>
      <TouchableOpacity className="ml-[16px]" onPress={() => navigation.goBack()}>
        <Noti />
      </TouchableOpacity>
      <TouchableOpacity onPress={() => toggle(true)}>
        <Text className="mr-[16px] text-[12px] font-medium text-left text-[#2E6BE5]" style={styles.font}>Mark all as read</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
    font:{
      fontFamily: 'Helvetica Neue',
    },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // paddingHorizontal: 10,
    alignItems: 'center',
    // height: 55,
    position:'fixed',
    top:0,
    backgroundColor:'white',
  },
  threedot: {
    marginRight: 6,
  },
});

export default NotifiHeader;
