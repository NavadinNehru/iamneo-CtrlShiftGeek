import React, { useState } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  Alert
} from 'react-native';
import SecondaryButton from '../components/Buttons/secondary';
import Facebook from '../assets/icons/facebook.svg';
import Google from '../assets/icons/google.svg';
import Input from '../components/Input/input';
import wel from '../assets/lottie/wel.json';
import LottieView from 'lottie-react-native';
import neo from '../assets/images/neo.png';
import { useNavigation } from '@react-navigation/native';
import { registerUser } from '../api/api';
export function Register() {
  const [userName, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [passwordMatchError, setPasswordMatchError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 
  const [uri,setUri]=useState('');
  const [mfa,setMfa]=useState(false);
  const navigation = useNavigation();

  const validateFields = () => {
    let isValid = true;

    if (userName.trim() === '') {
      setUserNameError('Username is required');
      isValid = false;
    } else {
      setUserNameError('');
    }

    if (password.trim() === '') {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (confirmPassword.trim() === '') {
      setConfirmPasswordError('Please confirm your password');
      isValid = false;
    } else {
      setConfirmPasswordError('');
    }

    // Check if passwords match
    if (password !== confirmPassword) {
      setPasswordMatchError('Passwords do not match');
      isValid = false;
    } else {
      setPasswordMatchError('');
    }

    return isValid;
  };

  const handleRegister =async () => {
    if (validateFields()) {
      setLoading(true);
      try {
        const data={
          "username":userName,
          "password":password,
          "mfa_enabled":mfa
        };
        console.log(data,"*************")
          const response =await registerUser(data);
          console.log("************",response);
          if(response?.message==="User registered successfully" && mfa===false){
              setSuccess(true);
              setTimeout(() => {
                  setSuccess(false);
              }, 1500);
              setTimeout(() => {
                if(response)
                navigation.navigate('LoginScreen');
              }, 1500);
            }
            else if(response?.message==="Username already exists"){
              Alert.alert("User already exists");
            }
            else if(mfa){
              setSuccess(true);
              const url = `data:image/png;base64/${response}`;
              setUri(url);
              setTimeout(() => {
                  setSuccess(false);
              }, 1500);
              setTimeout(() => {
                navigation.navigate('Qr',{uri:`data:image/png;base64,${response?.qrcode}`});
              }, 1500);
            }
      } catch (error) {
        console.log(error);
          Alert.alert("Upload document failed");
      } finally {
          setLoading(false);
      }
    }
  };



  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View className="mb-8 ml-1">
            <Text className="text-[24px] font-[Poppins-SemiBold] font-semibold mt-4 text-[#000000]">
              Welcome back!
            </Text>
            <Text className="text-[16px] font-[Lato] mt-2 text-[#000000]">
              Create your account
            </Text>
          </View>
          <LottieView source={wel} autoPlay loop style={{ width: 150, height: 150 }} />
        </View>
        {
                    loading ? (
                        <View>
                            <LottieView source={require('../assets/lottie/loading.json')} autoPlay loop style={{ height: 250, width: 360, alignSelf: 'center' }} />
                            <Text style={[{ fontSize: 12, color: 'black', fontWeight: '400', letterSpacing: 0.2, alignSelf: 'center', marginTop: -110 }, styles.font]}>Uploading...</Text>
                        </View>
                    ) : success ? (
                        <View>
                            <LottieView source={require('../assets/lottie/success.json')} autoPlay style={{ height: 400, width: 180, alignSelf: 'center',marginTop: -100 }} />
                            <Text style={[{ fontSize: 12, color: 'black', fontWeight: '400', letterSpacing: 0.2, alignSelf: 'center', marginTop: -110 }, styles.font]}>
                                Registration Successful!
                            </Text>
                        </View>
                    ) : (
      <>
          <Input
            value={userName}
            label="Username"
            labelStyle={styles.label}
            placeholder="e.g. person@gmail.com"
            containerStyle={[styles.inputmargin, { marginTop: -30 }]}
            setValue={(val) => setUsername(val)}
            />
          {userNameError ? <Text style={styles.errorText}>{userNameError}</Text> : null}

          <Input
            value={password}
            label="Password"
            labelStyle={styles.label}
            placeholder="Enter your password"
            containerStyle={styles.inputmargin}
            setValue={(val) => setPassword(val)}
            password={true}
            />
          {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}

          <Input
            value={confirmPassword}
            label="Confirm Password"
            labelStyle={styles.label}
            placeholder="Enter your password again"
            containerStyle={styles.inputmargin}
            setValue={(val) => setConfirmPassword(val)}
            password={true}
            />
          {confirmPasswordError ? <Text style={styles.errorText}>{confirmPasswordError}</Text> : null}
          {passwordMatchError ? <Text style={styles.errorText}>{passwordMatchError}</Text> : null}

          <TouchableOpacity className="flex justify-end flex-row mb-0" onPress={()=>{
            setMfa(!mfa);
          }}>
            {
              mfa?(
              <Text className="text-[#0D69D7] text-[14px] font-normal mt-0 font-[Lato-Bold]">
                Mfa is enabled
              </Text>
              ):(
              <Text style={{color:'red'}} className=" text-[14px] font-normal mt-0 font-[Lato-Bold]">
                Mfa is disabled
              </Text>
              )
            }
            </TouchableOpacity>
        <TouchableOpacity
          className="bg-black flex mt-3 items-center mb-4 justify-center border rounded-md"
          onPress={handleRegister}
          >
          <Text className="text-white h-[48px] text-[16px] py-3 font-medium font-[Poppins]">
            Register
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white flex items-center text-center mb-4 justify-center border rounded-md"
          >
            <Text className="h-[48px] text-[16px] py-3 font-[800] font-[Helvetica Neue] text-[#0D69D7]">
              Docs Chat
            </Text>
        </TouchableOpacity>

        <View style={styles.signinTextContainer}>
          <Text style={styles.signinText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('LoginScreen')}>
            <Text style={styles.signinActionText}>Sign in</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.dividerContainer}>
          <Text style={styles.dividerText}>in collab and partner with</Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.twoColumn}>
          <SecondaryButton containerStyle={styles.socialButton}>
            <Google />
            <Text className="text-[#08090A] font-[Lato] font-[400] text-[16px]">
              CtrlShiftGeek
            </Text>
          </SecondaryButton>
          <SecondaryButton containerStyle={styles.socialButton}>
            {/* <Facebook /> */}
            <Image source={neo} style={{width:70,height:23.5}}/>
            <Text className="text-[#08090A] font-[Lato] font-[400] text-[16px]">
              iamneo
            </Text>
          </SecondaryButton>
        </View>
          </>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    // paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 8,
  },
  inputmargin: {
    marginBottom: 8,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  signinTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    columnGap: 8,
    alignItems: 'center',
    marginBottom: 24,
  },
  signinText: {
    color: '#08090A',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: 'Lato',
  },
  signinActionText: {
    color: '#0D69D7',
    fontFamily: 'Lato-Bold',
    fontSize: 14,
    lineHeight: 20,
  },
  dividerContainer: {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 24,
  },
  dividerText: {
    textAlign: 'center',
    color: '#000',
    fontWeight: '600',
    backgroundColor: '#fff',
    paddingHorizontal: 8,
    position: 'relative',
    zIndex: 10,
    fontFamily: 'Lato-Bold',
  },
  divider: {
    position: 'absolute',
    top: '50%',
    width: '100%',
    height: 1,
    backgroundColor: '#CED4DA',
    zIndex: 1,
  },
  twoColumn: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
    marginBottom: 24,
  },
  socialButton: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    columnGap: 8,
  },
});
