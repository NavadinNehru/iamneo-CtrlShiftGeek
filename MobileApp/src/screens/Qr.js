import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

const Qr = () => {
  const route = useRoute();
  const navigation = useNavigation();
  console.log("??????????",route?.params?.uri)
  return (
    <View style={styles.container}>
      <Image source={{ uri: route?.params?.uri }} style={styles.image} />
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          navigation.navigate('LoginScreen');
        }}
      >
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Qr;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    height: 350,
    width: 350,
  },
  button: {
    width:'90%',
    backgroundColor: 'black',
    marginTop: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
    fontFamily: 'Poppins',
  },
});
