import React from 'react'
import { Text, TouchableOpacity,View } from 'react-native'
import { useAccountContext } from '../hooks/Context'
import { useNavigation } from '@react-navigation/native'
function PersonalizedButton({children}) {
  const navigation=useNavigation();
  const {account } = useAccountContext()
  return (
    <View className="flex-row items-center justify-center " >
        {account.accountIs !== 'guest' && <TouchableOpacity className = "rounded-2xl px-3 py-[6px] mr-3 bg-[#FFAFDE]" onPress={()=>{
          navigation.navigate('Personalisation');
        }}>
            <Text className = "font-helvetica-neue text-[#1A2233] text-[10px] font-normal italic tracking-[0.1px] ">Personalise</Text>
        </TouchableOpacity>}
        {children}
    </View>

  )
}

export default PersonalizedButton