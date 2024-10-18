import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from 'react-native';
import { verifyOtp } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Mfa = () => {
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef([]);

  const handleLogin = async () => {
    // Your login logic here...
    try {
        const userName = await AsyncStorage.getItem('username');
        const parsed = JSON.parse(userName);  
        console.log(parsed.userName);
      const data = {
        username:parsed.userName,
        mfa_code: otp.join(''), // Joining the OTP array into a string
      };
      console.log(data);
      const response = await verifyOtp(data);
      if (response?.message === "MFA verification successful") {
        navigation.navigate('Home');
      } else if (response?.message==="Incorrect MFA code") {
        Alert.alert(response?.message);
      }
    } catch (error) {
      Alert.alert("An error occurred during verification");
    }
  };

  const handleOtpChange = (index, value) => {
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to the next input if the current input is filled
    if (value && index < otp.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (!otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Enter OTP</Text>
          <View style={styles.otpContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.otpInput}
                value={digit}
                onChangeText={value => handleOtpChange(index, value)}
                onKeyPress={({ nativeEvent }) => {
                  if (nativeEvent.key === 'Backspace') {
                    handleBackspace(index);
                  }
                }}
                keyboardType="numeric"
                maxLength={1}
                ref={ref => (inputRefs.current[index] = ref)}
              />
            ))}
          </View>
          <TouchableOpacity style={styles.submitButton} onPress={handleLogin}>
            <Text style={styles.submitText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Mfa;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  innerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // width: '80%',
    alignSelf:'center'
  },
  otpInput: {
    borderWidth: 1,
    borderColor: '#CED4DA',
    borderRadius: 5,
    textAlign: 'center',
    fontSize: 18,
    color: 'black',
    paddingVertical: 10,
    width: '14%',
    marginRight:10
  },
  submitButton: {
    marginTop: 30,
    backgroundColor: '#000',
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 5,
  },
  submitText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
