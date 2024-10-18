import React, {useState} from 'react';
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
import Input from '../components/Input/input';
import SecondaryButton from '../components/Buttons/secondary';
import ChevronLeft from '../assets/icons/chevron-left.svg';
import Facebook from '../assets/icons/facebook.svg';
import Google from '../assets/icons/google.svg';
import wel from '../assets/lottie/wel.json';
import LottieView from 'lottie-react-native';
import { useNavigation } from '@react-navigation/native';
import neo from '../assets/images/neo.png';
import { loginUser } from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
export function Login() {
  const [userName,setUserName]=useState('');
  const [password, setPassword] = useState('');
  const [userNameError, setUserNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); 
  const navigation=useNavigation();
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

    return isValid;
  };
  const handleLogin = async () => {
    if (validateFields()) {
      setLoading(true);
      try {
        const data = {
          "username": userName,
          "password": password,
        };
        const response = await loginUser(data);
        if (response?.message === "Login successful" && response?.mfa_enabled === false) {
          await AsyncStorage.setItem('username', JSON.stringify({ userName })); // Stringify the object
          console.log("User login successful without MFA");
          navigation.navigate('Home');
        } else if (response?.message === "Login successful" && response?.mfa_enabled === true) {
          await AsyncStorage.setItem('username', JSON.stringify({ userName })); // Stringify the object
          navigation.navigate('Mfa');
        }
        else if(response?.message==="Invalid username or password"){
          Alert.alert(response?.message);
        }
      } catch (error) {
        Alert.alert("some error occured");
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <>
      <ScrollView style={styles.container}>
        <StatusBar backgroundColor="white" barStyle="dark-content" />
        <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center'}}>
        <View className="mb-8 ml-1">
          <Text className="text-[24px] font-[Poppins-SemiBold] font-semibold mt-4 text-[#000000]">
            Welcome back!
          </Text>
          <Text className="text-[16px] font-[Lato] mt-2 text-[#000000]">
            Sign in to your account
          </Text>
        </View>
        <LottieView source={wel} autoPlay loop style={{width:150,height:150,}}/>
        </View>
        {
                    loading ? (
                        <View>
                            <LottieView source={require('../assets/lottie/loading.json')} autoPlay loop style={{ height: 250, width: 360, alignSelf: 'center' }} />
                            <Text style={[{ fontSize: 12, color: 'black', fontWeight: '400', letterSpacing: 0.2, alignSelf: 'center', marginTop: -110 }, styles.font]}>Uploading...</Text>
                        </View>
                    ) :(
                      <View>

          <>
            <Input
              value={userName}
              label="Username"
              labelStyle={styles.label}
              placeholder="e.g. person@gmail.com"
              containerStyle={styles.inputmargin}
              setValue={(val: String) => setUserName(val)}
              />
            {userNameError ? <Text style={styles.errorText}>{userNameError}</Text> : null}
            <Input
              value={password}
              label="Password"
              labelStyle={styles.label}
              placeholder="Enter your password"
              containerStyle={styles.inputmargin}
              setValue={(val: String) => setPassword(val)}
              password={true}
              />
            {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
            <TouchableOpacity className="flex justify-end flex-row mb-4">
              <Text className="text-[#0D69D7] text-[14px] font-normal mt-2 font-[Lato-Bold]">
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </>
        <TouchableOpacity className="bg-black flex items-center mb-4 justify-center border rounded-md"
        onPress={()=>{
          handleLogin();
        }}
        >
          <Text className="text-white h-[48px] text-[16px] py-3 font-medium font-[Poppins]">
            Sign in
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
          <Text style={styles.signinText}>Don't have an account?</Text>
          <TouchableOpacity onPress={()=>{
            navigation.navigate('Register');
          }}>
            <Text style={styles.signinActionText}>Create account</Text>
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
        </View>
    )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  container: {
    backgroundColor: '#fff',
    paddingTop: 10,
    paddingHorizontal: 16,
    paddingBottom: 30,
  },
  phoneContainer: {
    marginBottom: 24,
  },
  label: {
    fontFamily: 'Lato-Bold',
    fontWeight: '600',
    fontSize: 14,
    lineHeight: 24,
    marginBottom: 8,
  },
  phoneInput: {
    backgroundColor: '#fff',
    width: '100%',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  phoneTextContainer: {
    backgroundColor: '#fff',
    paddingLeft: 0,
  },
  phoneCode: {
    fontWeight: '400',
    fontSize: 14,
  },
  phoneText: {
    fontWeight: '400',
    paddingLeft: 16,
    fontSize: 14,
    borderLeftWidth: 1,
    borderColor: '#08090A',
  },
  inputContainer: {
    marginBottom: 24,
  },
  inputmargin: {
    marginBottom: 0,
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
