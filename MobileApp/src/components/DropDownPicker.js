import { View, FlatList, Text, StyleSheet, TouchableOpacity, Modal} from "react-native";
import React ,{useState} from "react";
import Cr2 from '../assets/icons/Cr2.svg';
export default function DropDownPicker({ items, onOptionChanged , label , value , error ,Error , leftIcon , ...probs }) {
    const [isFocused, setIsFocused] = useState(false);
  return (
    <View style = {styles.container} className= {!error && "mb-[3px]"}>
      <View style={[styles.inputContainer,error&&styles.errorStyle]}>
        {leftIcon&&leftIcon((( error || (!isFocused && value)) ?'#1A2233':'grey'))}
        <Text className = {`ml-3 flex-1 text-sm font-helvetica-neue ${!value || isFocused ? (error ? "font-medium text-red-400/60 " :" font-medium text-[#737780] "): " font-normal text-[#1A2233] "}`}>{!value || isFocused ? label : value}</Text>
        
        <TouchableOpacity onPress={()=>setIsFocused(!isFocused)} className="items-center  justify-center w-[20px] h-[20px] mr-[14px]">
        <Cr2 stroke={(( error || (!isFocused && value)) ?'#1A2233':'grey')} strokeWidth={0.5}/>
        </TouchableOpacity>
        </View>
        {error&&<Error/>}
        <Modal
        visible={isFocused}
        transparent={true}
        animationType='fade'
        onRequestClose={()=>setIsFocused(false)}
        >
          <View className= "w-full h-full absolute bg-[#00000038] " onTouchEnd={()=>setIsFocused(false)}/>  
          <View className=" top-[50%] mx-auto w-[85%] relative ">
          <View className="bg-white rounded py-3 shadow-sm shadow-[rgba(147, 156, 163, 0.36)]">
            <FlatList
                data={items}
                renderItem={({item})=>(
                    <TouchableOpacity onPress={() => {onOptionChanged(item.value) , setIsFocused(false)}} className="h-[36px] px-3 py-1 justify-center flex"
>
                        <Text className="text-[#08090A] text-sm font-helvetica-neue font-normal ">{item.label}</Text>
                    </TouchableOpacity> 
                )}
                keyExtractor={(item)=>item.value}
                />
            </View>
            </View>
        </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
    container:{
        width: '100%',
        // alignItems: 'center',
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
        // padding: 10,
        paddingVertical: 14,
        // marginVertical: '5',
        width: '100%',
        justifyContent: 'center',
        gap: 6,
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
        marginLeft: '1%',
        flex: 1,
        fontSize: 14,
        lineHeight: 20,
        fontFamily: 'Helvetica Neue',
        justifyContent: 'center',
        padding: 'auto'
    },
    placeholderText: {
        fontWeight: '500',
        color: '#737780'
    },
    inputText:{
        fontWeight: '400',
        color: '#1A2233',
    },
    errorStyle:{
        borderColor: '#DD1D43', 
        backgroundColor: '#FFECEE',
        color:'red',
    },
    rightIcon:{
        // backgroundColor: 'red',
        height: 20,
        width: 32,
        alignItems: 'center',
        justifyContent: 'center',
    },
    itemContainer :{
        position: 'absolute',
        backgroundColor: '#FFF',
        top: 46,
        zIndex: 10,
        width: '100%',
        borderBottomLeftRadius: 4,
        borderBottomRightRadius: 4,
        paddingVertical: 5,
        shadowColor: '#939CA3',
        shadowOffset: { width: 2, height: 2 },
        shadowRadius: 3,
        elevation: 5,
        shadowOpacity: 0.8,
        borderWidth: 1,
        borderTopWidth: 0,
        borderColor: '#939CA3',
    },
    item :{
        marginLeft: 20,
        paddingVertical: 4,
        paddingHorizontal: 12,

    }
})