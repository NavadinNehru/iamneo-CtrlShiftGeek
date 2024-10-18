import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useEffect } from 'react'
import { useLoadJWT } from '../utility/loadJWT'
import Spinner from '../components/Spinner.js';
import { useAuthContext } from '../hooks/Context';
import Notification from '../screens/Notification/Notification.js';
import DrawerRoute from './DrawerRoute.tsx';
import Onboarding from '../screens/Onboarding/Onboarding.tsx';
import { Login } from '../screens/Onboarding.js';
import { Register } from '../screens/Register';
import Qr from '../screens/Qr.js';
import Mfa from '../screens/Mfa.js';
const Stack = createNativeStackNavigator();

const Router = () => {
    const { authState } = useAuthContext()
    const [loadJWT, status] = useLoadJWT()
    const [authenticated , setAuthenticated] = React.useState(false)
    useEffect(() => {
        loadJWT()
    }, [])
    useEffect(() => {
        console.log("Auth State",authState);
        if(authState.authenticated === true){
            setAuthenticated(true);
        }
    }, [status])
    if (status === 'loading') {
        return <Spinner />
    }
    if (authenticated === true) {
        return (
            <Stack.Navigator initialRouteName={'Home'} screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Home' component={DrawerRoute} options={{ headerShown: false }} />
                <Stack.Screen name='Notification'component={Notification} options={{ headerShown: false }} />
            </Stack.Navigator>
        )
    }
    return (
        <Stack.Navigator initialRouteName={'Onboarding'} screenOptions={{ headerShown: false }}>
            <Stack.Screen name='Onboarding'component={Onboarding} options={{ headerShown: false }} />
            <Stack.Screen name='LoginScreen' component={Login} options={{ headerShown: false }} />
            <Stack.Screen name='Register' component={Register} options={{ headerShown: false }} />
            <Stack.Screen name='Qr' component={Qr} options={{ headerShown: false }} />
            <Stack.Screen name='Mfa' component={Mfa} options={{ headerShown: false }} />
            <Stack.Screen name='Home' component={DrawerRoute} options={{ headerShown: false }} />
            <Stack.Screen name='Notification'component={Notification} options={{ headerShown: false }} />
        </Stack.Navigator>
    )
}

export default Router