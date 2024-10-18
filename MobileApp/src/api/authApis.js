import * as Keychain from 'react-native-keychain';
import axios from './axios';
import { useAuthContext , useAccountContext } from '../hooks/Context';
import { Alert } from 'react-native';
import { useState } from 'react';
import prof from '../assets/images/prof.png'
import { saveAccount } from '../utility/saveInLocalStorage';

export const useLogin = () => {
    const [loading, setLoading] = useState(false)
    const [nextpage, setNextPage] = useState({})
    const { setAuthState } = useAuthContext()
    const { setAccount } = useAccountContext()
    const Loginapi = async (formData) => {
        console.log(formData)
        try {
            setLoading(true)
            const response = await axios.get('/ws-login-user', { params: formData })
            //console.log(response.data)
            const { access_token } = response.data;
            if (access_token === undefined) {
                throw new Error(JSON.stringify({ message: response.data.msg }));
            }
            setAuthState({
                accessToken: access_token,
                refreshToken: access_token,
                authenticated: true
            })
            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({ accessToken: access_token, refreshToken: access_token, authenticated:true })
            );
            setAccount({...response.data.user_details,accountIs : 'user', profileSrc: prof}) 
            saveAccount({...response.data.user_details,accountIs : 'user', profileSrc: prof})
            setNextPage(response.data.user_details)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            const error = JSON.parse(e.message);
            console.log(error)
            Alert.alert(error.message);
        }
    }
    return [loading,Loginapi, nextpage]
}


export const useResitration = () => {
    const { setAuthState } = useAuthContext()
    const [nextpage, setNextPage] = useState({})
    const { setAccount } = useAccountContext()
    const registerapi = async (data) => {
        console.log("initial data",data);
        setNextPage({ loading: true });
        
        const formData = { ...data }; // Spread the data to avoid mutating the original object
        
        // Handle email and mob_no fields
        if (!formData.email.includes('@')) {
            formData.mob_no = formData.email;
            delete formData.email;
        } else {
            delete formData.user_country_code;
        }
        
        // Split fullName into first_name and last_name
        if (formData.fullName) {
            const [first_name, ...last_name] = formData.fullName.split(' ');
            formData.first_name = first_name;
            formData.last_name = last_name.join(' '); // Join the last name parts back into a string
        }
        
        // Assign a fixed mobile number (you can remove this if not needed)
        // formData.mob_no = "1234567890";
        
        // Clean up unnecessary fields
        delete formData.fullName;
        delete formData.conformPassword; // Assuming you meant "confirmPassword"
        
        // Now formData is ready to be used
        console.log(formData);   
        
        
        let formDatas = new FormData();

// Append each key-value pair to the FormData object
Object.keys(formData).forEach((key) => {
    if (key !== 'user_type') {
        formDatas.append(key,formData[key]);
    }
//   formDatas.append(key, formData[key]);
});

// Log the FormData object

// To see the FormData contents in a more readable format
// for (let pair of formDatas.entries()) {
//     console.log(`${pair[0]}: ${pair[1]}`);
// }'
try {
    console.log("?????",formData)
    console.log("*************", formDatas);
            const response = await axios.post('/v3/ws-register-user', formDatas,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            )
            console.log("data", response)
            const { access_token } = response.data;
            if (access_token === undefined && response.data.msg === undefined) {
                console.log("error", response.data)
                throw new Error(JSON.stringify({ message: response.data.msg }));
            }

            setAuthState({
                accessToken: access_token,
                refreshToken: access_token,
                authenticated: true ,
            })
            await Keychain.setGenericPassword(
                'token',
                JSON.stringify({ accessToken: access_token, refreshToken: access_token, authenticated: true })
            );
            setAccount({...response.data.user_details , accountIs : 'user', profileSrc: prof})
            saveAccount({...response.data.user_details,accountIs : 'user', profileSrc: prof})
            setNextPage(response.data.user_details)
        } catch (error) {
            console.log(error)
            setNextPage({error:true})
            // const  error = JSON.parse(e.message);
            let message;
            if (error.response.data.errors.email) {
                message = error.response.data.errors.email[0];
            } else if (error.response.data.errors.mob_no) {
                message = error.response.data.errors.mob_no[0];
            } else {
                message = 'Unknown error occurred';
            }
            console.log(message)
            Alert.alert(message);
        }
    }
    return [registerapi,nextpage]
}


export const getTopGroup = async () => {
    try {
        const response = await axios.get('/ws-get-top-and-child-groups')
        //console.log(response.data)
        return response.data.group
    } catch (e) {
        console.log(e.response.data.errors)
    }
}

