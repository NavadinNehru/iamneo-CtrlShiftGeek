import { StyleSheet, TextInput, View } from 'react-native'
import React, {useRef, useState} from 'react'
import { TouchableOpacity } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import EyeIcon from '../assets/icons/EyeIcon.svg';

export default function Input({label,value,onChange,leftIcon,error,Error,secureTextEntry,showPasswordIcon = false ,...probs}) {
    const [isFocused, setIsFocused] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const passRef=useRef(null);
    const handleFocus = () => {
        passRef.current.focus();
    };
    //console.log(error)
    return (
        <View style = {styles.container}>
        <View style={[styles.inputContainer,
            isFocused&&styles.inputContainerFocused,
            error&&styles.errorStyle
            ]}>
            {leftIcon&&leftIcon((( error || (!isFocused && value)) ?'#1A2233':'grey'))}
            <TextInput
                ref={passRef}
                // style={[styles.input , value ? styles.inputText : styles.placeholderText]}
                className ={`ml-3 flex-1 text-sm font-helvetica-neue  ${!value  ? " font-medium text-[#737780] ": "font-normal text-[#1A2233] top-0.5"}`}
                value={value}
                onChangeText={onChange}
                placeholder={label}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                {...probs}
                secureTextEntry={secureTextEntry&&!showPassword}
                placeholderTextColor={error?'#ff9999':(isFocused ? '#ccc':'#737780')}
                
            />
            {secureTextEntry&& showPasswordIcon && (
                <TouchableOpacity 
                style={{marginRight: '2%'}}
                onPress={()=>{
                    setShowPassword(!showPassword)
                    handleFocus()
                }}
                >
                    <EyeIcon height={16} width={16} marginRight = {10} stroke={showPassword ? '#2E6BE5' : (( error || (!isFocused && value)) ?'#1A2233':'grey')}/>
                </TouchableOpacity>
            )}
        </View>
        <View style= {styles.errorContainer}>
        {error&&<Error/>}
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        width: '85%',
        alignItems: 'center',
        flexDirection: 'column',
        gap: 3,
    },
    errorContainer:{
        alignSelf: 'flex-start',
    },
    inputContainer: {
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 7,
        padding: '10',
        // marginVertical: '5',
        width: '100%',
        justifyContent: 'center',
    },
    inputContainerFocused: {
        backgroundColor: '#F0F5FF',
        borderColor: '#002B80', 
        // shadowColor: '#007AFF',
        borderWidth: 2,
        // shadowOffset: { width: 2, height: 2 },
        // shadowOpacity: 0.8,
        // shadowRadius: 3,
        // elevation: 5, 
    },
    input: {
        // marginLeft: 6,
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        color: '#1A2233',
        fontFamily: 'Helvetica Neue',
    },
    placeholderText: {
        fontWeight: '500',
    },
    inputText:{
        fontWeight: '400'
    },
    errorStyle:{
        borderColor: '#DD1D43', 
        backgroundColor: '#FFECEE',
        color:'red',
    },
})