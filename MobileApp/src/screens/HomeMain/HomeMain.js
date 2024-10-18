import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import HomeLearn from './HomeLearn';
import Preparation from '../Preparation/Preparation.js';
import Jobs from '../Jobs/Jobs.js';
import learn from '../../assets/images/learn.png'; 
import prep from '../../assets/images/prep.png';
import job from '../../assets/images/job.png';
import Notifi from '../../assets/icons/Notifi.svg';
import Mail from '../../assets/icons/Mail.svg';
import LearnMain from './LearnMain';
import Learner from '../../assets/icons/Learn.svg';
import Jober from '../../assets/icons/Jobs.svg';
import Preper from '../../assets/icons/Prep.svg';
import learner from '../../assets/images/learner.png';
import preper from '../../assets/images/preper.png';
import prof from '../../assets/images/prof.png';
import jober from '../../assets/images/jober.png';
import ho from '../../assets/images/ho.png';
import base from '../../assets/images/base.png';
import { useAccountContext } from '../../hooks/Context.js';
const Tab = createBottomTabNavigator();
import { SafeAreaView } from 'react-native-safe-area-context';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Notification from '../Notification/Notification.js';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import Profile from '../../components/Profile.js';
const HomeMain = () => {
  const navigation = useNavigation();
  const { account } = useAccountContext() ;
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { ...styles.tabBar },
      }}
    >
      <Tab.Screen
        name="Learn"
        component={LearnMain}
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[
              styles.iconContainer, 
            ]}
            // className="w-[116px] h-[48px] p-[6px] gap-[0px] rounded-tl-[40px] "
            >
              {
                <View style={{backgroundColor: focused?'#0D69D7':null ,paddingVertical:4,paddingHorizontal:'8%',borderRadius:6}}>
                  <Image
                    source={ho}
                    style={{ tintColor: 'white' , }}
                    className="w-[26px] h-[26px]"
                  />
                </View>
              }
              <Text style={[{ fontSize:13, color:'white',marginTop:-5},styles.font]}
              className="font-[600]"
              >Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Prep"
        component={Preparation}
        options={{
          headerLeft: () => (
            <Profile />
          ),
          headerRight: () => (
            <TouchableOpacity style={{ marginRight: 15 }}
            onPress={()=>{
              navigation.navigate('Notification');
            }}
            >
              <Notifi />
            </TouchableOpacity>
          ),
          headerTitle: '',
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[
              styles.iconContainer, 
            ]}
            // className="w-[116px] h-[48px] p-[6px] gap-[0px] rounded-tl-[40px] "
            >
              {
                <View style={{backgroundColor: focused?'#0D69D7':null ,paddingVertical:4,paddingHorizontal:'8%',borderRadius:6}}>
                  <Image
                    source={base}
                    style={{ tintColor: 'white' , }}
                    className="w-[28px] h-[28px]"
                  />
                </View>
              }
              <Text style={[{ fontSize:13, color:'white',marginTop:-5},styles.font]}
              className="font-[600]"
              >Base</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={Jobs}
        options={{
          headerLeft: () => (
            <Profile />
          ),
          headerRight: () => (
            <View style={styles.headerRight}>
              <TouchableOpacity style={{ marginRight: 0 }}>
                <Mail />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginRight: 0 }} 
              onPress={()=>{
                navigation.navigate('Notification');
              }}
              >
                <Notifi />
              </TouchableOpacity>
            </View>
          ),
          headerTitle: '',
          headerShown: true,
          tabBarIcon: ({ focused, color, size }) => (
            <View style={[
              styles.iconContainer, 
            ]}
            // className="w-[116px] h-[48px] p-[6px] gap-[0px] rounded-tl-[40px] "
            >
              {
                <View style={{backgroundColor: focused?'#0D69D7':null ,paddingVertical:4,paddingHorizontal:'8%',borderRadius:6}}>
                  <Image
                    source={jober}
                    style={{ tintColor: 'white' , }}
                    className="w-[26px] h-[26px]"
                  />
                </View>
              }
              <Text style={[{ fontSize:13, color:'white',marginTop:-5},styles.font]}
              className="font-[600]"
              >Jobs</Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Helvetica Neue',
  },
  prof: {
    width: 40,
    height: 40,
    borderRadius: 50,
    margin: 20,
  },
  notifi: {
    marginRight: 20,
    height: 45,
    width: 45,
  },
  navStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '95%',
  },
  tabBar: {
    height: 60,
    backgroundColor:'black'
  },
  iconContainer: {
    flexDirection:'column',
    justifyContent: 'center',
    // justifyContent:'space-evenly',
    marginTop:5,
    alignItems: 'center',
    // padding: '1%',
    // borderRadius:50,
    // width:115,
    // paddingVertical:'3%'
    // paddingHorizontal:50
  },
  headerRight: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
});

export default HomeMain;
