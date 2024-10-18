import React, { useState, useEffect, forwardRef, useMemo } from 'react';
import { ScrollView, View, Text, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, Keyboard, Platform, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { LoginSchema, registerSchema } from '../../utility/yepSchema';
import { useLogin, useResitration } from '../../api/authApis';
import Input from '../Input';
import ModalSpinner from './ModalSpinner';
import GoogleIcon from '../../assets/icons/GoogleIcon.svg'
import LockedIcon from '../../assets/icons/LockedIcon.svg'
import MailWithoutGradient from '../../assets/icons/MailWithoutGradient.svg'
import FacebookIcon from '../../assets/icons/FacebookIcon.svg'
import AccountOutlineIcon from '../../assets/icons/AccountOutlineIcon.svg'
import { useNavigation } from '@react-navigation/native';
import { Picker } from '@react-native-picker/picker';
import CodeIcon from '../../assets/icons/CodeIcon.svg';
import DropDownInput from '../DropDownPicker';
import WaveHandEmoji from "../../assets/icons/WaveHandEmoji.svg"
import { BottomSheetModal ,BottomSheetView } from '@gorhom/bottom-sheet';

const capitalizedFirstLetter = (string) => {
  if(string) return string.charAt(0).toUpperCase() + string.slice(1);
  return string;
};

export default forwardRef (function RegisterPopUpScreen( { onRequestClose }, ref) {
  const [isLogin, setIsLogin] = useState(false);
  useEffect(() => { 
    console.log("RegisterPopUpScreen")
   }, [])
  useEffect(()=>{
    console.log("RegisterPopUpScreen", isLogin)
    if(isLogin){
      ref.current?.collapse()
    }else{
      ref.current?.expand()
    }
  },[isLogin])
  const snapPoints = useMemo(() => ["50%", '65%'], []);
  return (
    <BottomSheetModal 
    ref={ref} 
    handleIndicatorStyle = {{backgroundColor: '#1A2233' , opacity:0.2 , width: 53 , height: 4 , borderRadius: 2 }}
    snapPoints={snapPoints}>
      <BottomSheetView style={{
      flex: 1,
      }}>
        {isLogin ? <Login toggleToRegister={() => setIsLogin(false)} /> : <Register toggleToLogin={() => setIsLogin(true)} />}
      </BottomSheetView>
    </BottomSheetModal>
  );
}) ;

const Login = ({ toggleToRegister }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
      device_name: Platform.OS === 'ios' ? '1' : '0'
    },
  });
  const [loading, Loginapi] = useLogin()
  const [keyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    console.log("Login Pop Up Screen")
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);

    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      //   keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {loading && <ModalSpinner visible={loading} />}
      <View keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <Text className="text-[26px] leading-[30px] text-[#1A2233] ml-[57px] font-bold my-6 text-left font-helvetica-neue w-full" > Log in and let's grow</Text>

          {!keyboardVisible &&
            <View style={styles.buttons}>
              <TouchableOpacity className="flex flex-row items-center bg-[#1A2233] h-[48px] rounded-[8px] w-[72%] justify-center" onPress={() => alert('Login with Google')}>
                <Text className="text-white mx-[2%] text-[14px] font-normal leading-[20px] font-helvetica"
>Continue with Google</Text>
                <GoogleIcon width={18} height={18} color={'white'} />
              </TouchableOpacity>
              <TouchableOpacity className="h-[48px] flex flex-row items-center bg-[#1A2233] p-[2%] rounded-[7px] ml-[1%] w-[12%] justify-center" onPress={() => alert('Login with Apple')}>
                {Platform.OS === 'ios' ? <Icon name="apple" size={24} color="#fff" /> : <FacebookIcon height={18} width={18} />}
              </TouchableOpacity>
            </View>
          }

          {/* <Text className="mb-6 my-4 text-center text-[#121212] font-helvetica-neue">Or use email</Text> */}
          {!keyboardVisible && <Text className="mb-6 my-4 text-center text-[#121212] font-helvetica-neue">Or use email</Text>}
          <View style={styles.inputView}>
            <Controller

              control={control}

              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  marginLeft={5}
                  label="Email / Phone"
                  value={value}
                  onChange={onChange}
                  leftIcon={(color) => <MailWithoutGradient marginLeft={5} strokeWidth={1.5} width={20} height={20} stroke={color} />}
                  error={errors.email}
                  Error={() => <Text className= "text-[#DD1D43] text-left w-[90%] text-[10px] leading-[14px] font-normal">{capitalizedFirstLetter(errors.email?.message)}</Text>}
                />
              )}
              name="email"
            />

            <Controller
              control={control}

              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  marginLeft={8}
                  label="Password"
                  value={value}
                  onChange={onChange}
                  leftIcon={(color) => <LockedIcon strokeWidth={1.5} marginLeft={5} width={20} height={20} stroke={color} />}
                  error={errors.password}
                  Error={() => <Text className= "text-[#DD1D43] text-left w-[90%] text-[10px] leading-[14px] font-normal">{capitalizedFirstLetter(errors.password?.message)}</Text>}
                  secureTextEntry
                />
              )}
              name="password"
            />
          </View>
          { <View style={styles.buttons}>
            <TouchableOpacity className="flex flex-row items-center bg-[#1A2233] p-[14px] px-[12px] rounded-[8px] my-[12px] h-12 w-[85%] justify-center font-helvetica-neue" onPress={handleSubmit(Loginapi)}>
              <Text className="text-white mx-[2%] text-[14px] font-normal leading-[20px] font-helvetica"
>Login Account</Text>
            </TouchableOpacity>
          </View>
          }
          <View style={styles.registerButton} >
            <Text className="text-[#121212] text-[12px] font-helvetica-neue">{`Don't have registration yet?`}</Text> 
            <TouchableOpacity onPress={toggleToRegister}><Text className="text-[10px] leading-[14px] font-bold text-black font-helvetica-neue ">Register now</Text></TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};
const Register = ({ toggleToLogin }) => {
  const [registerapi, nextpage] = useResitration()
  const navigation = useNavigation();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      user_country_code: '91',
      user_type: '',
      device_name: Platform.OS === 'ios' ? '1' : '0'
    },
  });
  onSubmit = (data) => {
    console.log(data);
  }
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  useEffect(() => {
    if (nextpage?.id) {
      console.log("register", nextpage.id)
      navigation.navigate('Topics', { ...nextpage });
    }
  }, [nextpage, navigation]);

  useEffect(() => {
    console.log("Register Pop Up Screen")
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardVisible(true);
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardVisible(false);

    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);
  return (
    <KeyboardAvoidingView
      style={styles.container}
      //   keyboardVerticalOffset={100}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {nextpage.loading && <ModalSpinner visible={nextpage.loading} />}
      <View keyboardShouldPersistTaps="handled">
        <View style={styles.content}>
          <View className = " flex flex-row gap-1  w-[85%] my-4">
            <Text className="text-[24px] text-[#1A2233] leading-[32px]  font-bold text-left font-helvetica-neue ">Hey, Welcome!</Text>
            <WaveHandEmoji height={23} width={23}/>
          </View>

          {!keyboardVisible &&
            <>
              <View style={styles.buttons}>
                <TouchableOpacity className="flex flex-row items-center bg-[#1A2233] h-[48px] rounded-[8px] w-[72%] justify-center" onPress={() => alert('Login with Google')}>
                  <Text className="text-white mx-[2%] text-[14px] font-normal leading-[20px] font-helvetica "
>Continue with Google</Text>
                  <GoogleIcon height={18} width={18} marginLeft={4} />
                </TouchableOpacity>
                <TouchableOpacity className="h-[48px] flex flex-row items-center bg-[#1A2233] p-[2%] rounded-[7px] ml-[1%] w-[12%] justify-center" onPress={() => alert('Login with Apple')}>
                  {Platform.OS === 'ios' ? <Icon name="apple" size={24} color="#fff" /> : <FacebookIcon height={20} width={20} />}
                </TouchableOpacity>
              </View>
              <Text className="mb-6 my-4 text-center text-[#121212] font-helvetica-neue">Or use email</Text>
            </>
          }
          <View style={styles.inputView}>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => {
                return (
                  <Input
                    marginLeft={10}
                    label="Your name"
                    value={value}
                    onChange={onChange}
                    leftIcon={(color) => <AccountOutlineIcon strokeWidth={1.5} height={18} width={18} stroke={color} marginLeft={10} />}
                    error={errors.fullName}
                    Error={() => errors.fullName && <Text className= "text-[#DD1D43] text-left w-[90%] text-[10px] leading-[14px] font-normal">{capitalizedFirstLetter(errors.fullName.message)}</Text>}
                  />)
              }
              }
              name="fullName"
            />
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  marginLeft={10}
                  label="Email / Phone"
                  value={value}
                  onChange={onChange}
                  error={errors.email}
                  leftIcon={(color) => <MailWithoutGradient strokeWidth={1.5} height={18} width={18} stroke={color} marginLeft={10} />}
                  Error={() => errors.email && <Text className= "text-[#DD1D43] text-left w-[90%] text-[10px] leading-[14px] font-normal">{capitalizedFirstLetter(errors.email.message)}</Text>}
                />
              )}
              name="email"
            />
            <View className="mt-1">
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <View className= "w-[85%] items-center flex-col gap-1 ">
                <DropDownInput
                 label={"Student / Professional"}
                 onOptionChanged={onChange}
                 value={value && (value === "0" ? "Student" : "Professional")}
                 items={[{label: "Student", value: "0"}, {label: "Professional", value: "1"}]}
                  error={errors.user_type}
                  Error={() => errors.user_type && <Text className= "text-[#DD1D43] text-left w-[90%] text-[10px] pl-1 leading-[14px] font-normal" >{capitalizedFirstLetter(errors.user_type.message)}</Text>}
                  leftIcon={(color) => <CodeIcon height={18} width={18} strokeWidth={0.5} stroke={color} fill={color} marginLeft={10}/>}
                />
              </View>
              )}
              name="user_type"
              />
            </View>
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  marginLeft={10}
                  label="Password"
                  value={value}
                  onChange={onChange}
                  leftIcon={(color) => <LockedIcon strokeWidth={1.5} height={18} width={18} marginLeft={10} stroke={color} />}
                  error={errors.password}
                  Error={() => errors.password && <Text className= "text-[#DD1D43] text-left w-[90%] text-[10px] leading-[14px] font-normal">{capitalizedFirstLetter(errors.password.message)}</Text>}
                  secureTextEntry={true}
                  showPasswordIcon={true}
                  rightIcon={null}
                />
              )}
              name="password"
            />
            <View style={styles.buttons}>
              <TouchableOpacity className="flex flex-row items-center bg-[#1A2233] p-[14px] px-[12px] rounded-[8px] my-[12px] h-12 w-[85%] justify-center font-helvetica-neue" onPress={handleSubmit(registerapi)}>
                <Text className="text-white mx-[2%] text-[14px] font-normal leading-[20px] font-helvetica"
>Create Account</Text>
              </TouchableOpacity>
            </View>
          </View>
          
          

          <View style={styles.registerButton} >
            <Text className="text-[#121212] text-[12px] font-helvetica-neue">{`Already have an account?`}</Text> 
            <TouchableOpacity onPress={toggleToLogin}>
            <Text className="text-[10px] leading-[14px] font-bold text-black font-helvetica-neue ">Login</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  buttons: {
    flexDirection: 'row',
    height:58 ,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  codeIcon: {
    fontSize: 15,
    fontWeight: 'light',
    paddingLeft: 6,
    fontFamily: 'Helvetica Neue',
  },
  gradient: {
    position: 'absolute',
    // width: '60%',
    // height: '70%',
    opacity: 0.2
  },
  guestButton: {
    position: 'absolute',
    top: 48,
    right: 30,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 50,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    zIndex: 1,
  },
  guestButtonText: {
    color: '#888',
    fontSize: 12,
  },
  shapes: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10,
  },
  content: {
    alignItems: 'center',
    // top: -50,
    // paddingHorizontal: '2%',
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 26,
    color: '#000000',
    marginLeft: 57,
    fontWeight: '700',
    marginVertical: 16,
    TextAlign: 'left',
    fontFamily: 'Helvetica Neue',
    width: '100%',
  },
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2233',
    // padding: 10,
    height: 48,
    borderRadius: 8,
    width: '72%',
    justifyContent: 'center',
  },
  googleButtonText: {
    color: '#fff',
    marginHorizontal: '2%',
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
    fontFamily: 'Helvetica Neue',
  },
  appleButton: {
    height: 48,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2233',
    padding: '2%',
    borderRadius: 7,
    marginLeft: '1%',
    width: '12%',
    justifyContent: 'center',
  },
  orText: {
    marginBottom: 24,
    marginVertical: 16,
    textAlign: 'center',
    //marginLeft:120,
    color: '#121212',
    fontFamily: 'Helvetica Neue',
  },

  inputContainer: {
    backgroundColor: '#f0f0f0',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 7,
    width: '85%',
    marginBottom: 2,
  },
  inputpicker: {
    flex: 1,
    fontFamily: 'Helvetica Neue',
  },
  loginButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#1A2233',
    marginTop: 16,
    padding: 14,
    paddingHorizontal: 12,
    borderRadius: 8,
    width: '85%',
    justifyContent: 'center',
    fontFamily: 'Helvetica Neue',
  },
  logo: {
    marginLeft: '1%',
    // borderWidth: 2,
  },

  placeholderText: {
    marginLeft: 10,
    color: '#737780',
    fontFamily: 'Helvetica Neue',
  },
  pickerColor: {
    color: '#1A2233',
    fontFamily: 'Helvetica Neue',
  },
  registerButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24,
    gap: 2,
    // marginRight:50,
    // textAlign: "left",
  },
  registerButtonText: {
    color: '#121212',
    fontSize: 10,
    lineHeight: 14,
    //marginRight:'10%',
    fontFamily: 'Helvetica Neue',
    //textAlign: "center",
  },
  rbold: {
    fontWeight: "600",
    fontSize: 10,
    lineHeight: 14,
    color: 'black',
    fontFamily: 'Helvetica Neue',
  },
  errorStyle: {
    color: 'red',
    textAlign: 'left',
    width: '90%',
    marginLeft: '1%',
    fontSize: 10,
    fontFamily: 'Helvetica Neue',
  },
  inputView: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,

  },
});


