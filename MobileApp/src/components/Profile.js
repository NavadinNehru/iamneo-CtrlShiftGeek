import React from 'react'
import { Image, TouchableOpacity } from 'react-native'
import { useAccountContext } from '../hooks/Context'
import { useNavigation } from '@react-navigation/native'

function Profile() {
    const {account} = useAccountContext()
    const navigation = useNavigation() ;
  return (
    <TouchableOpacity onPress={()=>{
        console.log("first")
        const DrawerNavigation = navigation.getParent("LeftDrawer")
        console.log(DrawerNavigation) ;
        DrawerNavigation?.openDrawer()
    }}>
        <Image source={account.profileSrc} className = "w-10 h-10 m-5 rounded-full" />
    </TouchableOpacity>
  )
}

export default Profile