import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Back from '../assets/icons/Back.svg';
import Threedot from '../assets/icons/Threedot.svg';
import { useNavigation } from '@react-navigation/native';
import PersonalizedButton from './PersonalizedButton';
const HeaderComp = ({ toggleModal }) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Back />
      </TouchableOpacity>
      <PersonalizedButton >
      <TouchableOpacity onPress={() => toggleModal(true)}>
        <Threedot style={styles.threedot} />
      </TouchableOpacity>
      </PersonalizedButton>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    alignItems: 'center',
    height: 55,
    position:'fixed',
    top:0,
    backgroundColor:'white',
  },
  threedot: {
    marginRight: 6,
  },
});

export default HeaderComp;
