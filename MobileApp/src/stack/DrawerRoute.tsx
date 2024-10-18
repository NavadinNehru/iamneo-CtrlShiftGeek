import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps, DrawerView, useDrawerProgress, DrawerItem, DrawerHeaderProps } from "@react-navigation/drawer";
import HomeMain from '../screens/HomeMain/HomeMain.js';
import AppliedJob from "../screens/Jobs/AppliedJob.js";
import HomeOutline from "../assets/icons/HomeOutlineIcon.svg";
import HomeFill from "../assets/icons/HomeIcon.svg";
import BrifCaseIcon from "../assets/icons/BrifCase.svg"
import BrifCaseOutlineIcon from "../assets/icons/BrifCaseOutline.svg"
import BookOpenIcon from "../assets/icons/BookOpen.svg"
import BookOpenOutlineIcon from "../assets/icons/BookOpenOutline.svg"
import SettingIcon from "../assets/icons/Setting.svg"
import SettingOutlineIcon from "../assets/icons/SettingOutline.svg"
import HeartIcon from "../assets/icons/Heart.svg"
import LinearGradient from "react-native-linear-gradient";
import React from "react";
import Animated, { interpolate } from "react-native-reanimated";
import Profile from "../components/Profile.js";
import Notifi from "../assets/icons/Notifi.svg";
import Mail from "../assets/icons/Mail.svg";
import { TouchableOpacity } from "react-native";
const Drawer = createDrawerNavigator();
function customDrawerContent(props: DrawerContentComponentProps) {
    return (<>
        <Animated.View className="flex-1 h-full flex-col " >

            <Animated.View className="mt-10 mb-6 mx-4 ">
                <Animated.View className="mb-4 flex-row items-center gap-4">
                    <Animated.Image source={require('../assets/images/prof.png')} className="h-[72px] w-[78px] rounded-full " />
                    <Animated.View classname="flex-col justify-center items-center  " >
                        <Animated.Text className="text-black text-[20px] leading-6 font-medium mt-2 font-helvetica-neue ">Rohit Ransore</Animated.Text>
                        <Animated.Text className="text-[#6D747A] text-sm font-helvetica-neue"> Profile Settings </Animated.Text>
                    </Animated.View>
                </Animated.View>
                <Animated.View className="h-[1px] w-full  bg-[#DBE7FF] " />
            </Animated.View>
            <Animated.View className=" h-fit flex-1" >
                <DrawerContentScrollView>
                    <DrawerItemList {...props} />
                    <DrawerItem label={() => (<Animated.Text className="text-[#1A2233] text-[14px] leading-[20px] font-helvetica-neue font-normal"> Account Settings</Animated.Text>)} icon={({ focused, color, size }) => (
                        focused ? <SettingIcon width={20} height={20} fill={color} /> : <SettingOutlineIcon width={20} height={20} stroke={'#1A2233'} />
                    )} onPress={() => { }} />
                </DrawerContentScrollView>
            </Animated.View>
        </Animated.View>
        <Animated.View className=" w-full h-full absolute  bottom-0 bg-transparent -z-10   ">
            <LinearGradient
                locations={[0, 0.6, 1.12]}
                colors={['#FEFEFE', '#FFF', '#C7D8F9']}
                useAngle={true} angle={210}
                style={{ flex: 1 }} />
        </Animated.View>
    </>
    )
}

function customJobHeader({ navigation, route }: DrawerHeaderProps) {
    return (
        <Animated.View className=" bg-white" >
            <Animated.View className = "flex-row justify-between ">
                <Profile />
            <Animated.View className="flex-row items-center gap-4 mr-1">
                <TouchableOpacity>
                    <Mail />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Notifi />
                </TouchableOpacity>
            </Animated.View>
            </Animated.View>
            <Animated.View className="px-[12px]" >
                <Animated.Text className="text-[#737780] text-[20px] leading-6 my-4 mx-3 " >MyJobs</Animated.Text>
                <Animated.View className="overflow-hidden">
                    <Animated.ScrollView
                        className="shadow-sm ring-1 h-12"
                        contentContainerStyle={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            gap: 10
                        }}
                        horizontal={true}
                        showsHorizontalScrollIndicator={false}
                    >
                        <TouchableOpacity onPress={() => {
                            navigation.jumpTo('SavedJob')
                        }}>
                            <Animated.Text className={`text-left text-[12px] leading-[16px] font-[400] px-[12px] py-[6px] mb-[10px] ${ route.name === 'SavedJob' ? 'text-[#1A2233]' : 'text-[#999999]'}`}>Saved Job</Animated.Text>
                            <Animated.View className={`h-[2px] w-[80%] rounded-t-[4px] mx-auto ${route.name === 'SavedJob' ? 'bg-[#1A2233]' : 'bg-transparent'} `} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => {
                            navigation.jumpTo('AppliedJob')
                        }}>
                            <Animated.Text className={`text-left text-[12px] leading-[16px] font-[400] px-[12px] py-[6px] mb-[10px] ${route.name === 'AppliedJob' ? 'text-[#1A2233]' : 'text-[#999999]'}`}>Applied Job </Animated.Text>
                            <Animated.View className={`h-[2px] w-[80%] rounded-t-[4px] mx-auto ${route.name === 'AppliedJob' ? 'bg-[#1A2233]' : 'bg-transparent'}`} />
                        </TouchableOpacity>
                    </Animated.ScrollView>
                </Animated.View>
            </Animated.View>
        </Animated.View>
    )
}
export default function DrawerRoute() {
    return (
        <Drawer.Navigator id="LeftDrawer" initialRouteName="HomeMain" 
            drawerContent={customDrawerContent}
            screenOptions={{
                drawerStyle: {
                    width: '85%',
                },
                drawerActiveBackgroundColor: "#2E6BE5",
                drawerActiveTintColor: "#fff",
                drawerInactiveTintColor: "#1A2233",
                drawerLabelStyle: {
                    fontSize: 14,
                    fontFamily: "Helvetica Neue",
                    fontWeight: "400",
                    lineHeight: 20,
                    textAlign: "left",
                    textTransform: "capitalize",
                },
                drawerItemStyle: {
                    paddingVertical: 4,
                    paddingHorizontal: 2,
                    borderRadius: 8,
                }
            }}
        >
            <Drawer.Screen name="HomeMain" component={HomeMain}
                options={{
                    drawerLabel: "Home",
                    title: "Home",
                    drawerIcon: ({ focused, color, size }) => (
                        focused ? <HomeFill width={20} height={20} fill={color} /> : <HomeOutline width={20} height={20} stroke={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Drawer.Screen name="MyCourse" component={HomeMain}
                options={{
                    drawerLabel: "My Courses",
                    title: "My Courses",
                    drawerIcon: ({ focused, color, size }) => (
                        focused ? <BookOpenIcon width={20} height={20} fill={color} /> : <BookOpenOutlineIcon width={20} height={20} stroke={color} />
                    ),
                    headerShown: false,
                }}
            />
            <Drawer.Group screenOptions={{
                header : customJobHeader,
                headerShown: true,
            }} >
                <Drawer.Screen name="AppliedJob" component={AppliedJob}
                    options={{
                        drawerLabel: "Applied Jobs",
                        title: "Applied Jobs",
                        drawerIcon: ({ focused, color, size }) => (
                            focused ? <BrifCaseIcon width={20} height={20} fill={color} /> : <BrifCaseOutlineIcon width={20} height={20} stroke={color} />
                        ),
                    }}
                />

                <Drawer.Screen name="SavedJob" component={AppliedJob}
                    options={{
                        drawerLabel: "Saved Jobs",
                        title: "Saved Jobs",
                        drawerIcon: ({ focused, color, size }) => (
                            focused ? <HeartIcon width={20} height={20} fill={color} /> : <HeartIcon width={20} height={20} stroke={color} />
                        )
                    }}
                />
            </Drawer.Group>
        </Drawer.Navigator>
    )
}
