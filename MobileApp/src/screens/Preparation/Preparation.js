import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, ImageBackground, Alert } from 'react-native'
import React, { useState, useEffect } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import LottieView from 'lottie-react-native'
import ground from '../../assets/images/ground.png';
import Input from '../../components/Input/input';
import upload from '../../api/uploadResume';
import useUploadResume from '../../api/uploadResume';

const Preparation = () => {
    const [name, setName] = useState('');
    const [username, setUsername] = useState('Navadin');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false); 
    const [nameError, setNameError] = useState(false); 

    const uploadPDF = async () => {
        // Reset error state first
        setNameError(false);

        // Validate if name is not empty
        if (!name.trim()) {
            setNameError(true);
            return; // Stop execution if name is empty
        }

        setLoading(true);
        try {
            const response = await useUploadResume(name, username);
            console.log(response);
        } catch (error) {
            Alert.alert("Upload document failed");
        } finally {
            setLoading(false);
            if(response.status === 200){
                setSuccess(true);
                setTimeout(() => {
                    setSuccess(false);
                }, 3000);
            }
        }
    }

    const WelcomeMessage = () => {
        return (
            <View style={{ paddingTop: 10 }}>
                <Text style={[{ fontSize: 18, color: 'black', fontWeight: '600', letterSpacing: 0.2 }, styles.font]}>
                    Create <Text style={styles.blueText}>Knowledge Base</Text>
                </Text>
                <Text style={[{ fontSize: 18, color: 'black', fontWeight: '600', letterSpacing: 0.2 }, styles.font]}>
                    <Text style={styles.blueText}>Security</Text> is ensured
                </Text>
            </View>
        );
    };

    return (
        <ImageBackground className="pl-[20px] pr-[20px]" source={ground} style={styles.container}>
            <ScrollView>
                <WelcomeMessage />
                <LottieView source={require('../../assets/lottie/jet1.json')} autoPlay loop style={{ height: 280, width: 260, marginTop: -50, marginLeft: -30 }} />
                {
                    loading ? (
                        <View>
                            <LottieView source={require('../../assets/lottie/loading.json')} autoPlay loop style={{ height: 250, width: 360, alignSelf: 'center' }} />
                            <Text style={[{ fontSize: 12, color: 'black', fontWeight: '400', letterSpacing: 0.2, alignSelf: 'center', marginTop: -110 }, styles.font]}>Uploading...</Text>
                        </View>
                    ) : success ? (
                        <View>
                            <LottieView source={require('../../assets/lottie/success.json')} autoPlay style={{ height: 360, width: 160, alignSelf: 'center',marginTop: -100 }} />
                            <Text style={[{ fontSize: 12, color: 'black', fontWeight: '400', letterSpacing: 0.2, alignSelf: 'center', marginTop: -110 }, styles.font]}>
                                Upload Successful!
                            </Text>
                        </View>
                    ) : (
                        <View>
                            <Text style={[{ fontSize: 18, color: 'black', fontWeight: '600', letterSpacing: 0.2 }, styles.font]}>
                                Upload <Text style={styles.blueText}>Document</Text>
                            </Text>
                            <View style={{ flexDirection: 'column', gap: 24, marginTop: 12 }}>
                                <Input
                                    value={name}
                                    label="Document Name"
                                    labelStyle={styles.label}
                                    placeholder="e.g. hr policy document"
                                    containerStyle={styles.inputContainer}
                                    setValue={(val: String) => setName(val)} // Fixed setValue to correctly set name
                                />
                                {nameError && (
                                    <Text style={styles.errorText}>Document Name is required</Text>
                                )}
                                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center', alignSelf: 'center', width: '100%', backgroundColor: 'black', borderRadius: 4 }}
                                    onPress={() => {
                                        uploadPDF();
                                    }}
                                >
                                    <Text style={[{ color: 'white', fontSize: 15, paddingVertical: 14 }, styles.font]}>Create Knowledge Base</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    )
                }
            </ScrollView>
        </ImageBackground>
    )
}

export default Preparation

const styles = StyleSheet.create({
    inputContainer: {
        // marginBottom: 24,
    },
    label: {
        fontFamily: 'Lato-Bold',
        fontWeight: '600',
        fontSize: 14,
        lineHeight: 24,
        marginBottom: 8,
    },
    container: {
        flex: 1,
        backgroundColor: 'white',
        flexDirection: 'column',
    },
    first: {
        height: '100%',
    },
    blueText: {
        color: '#0D69D7',
        fontSize: 19,
    },
    blackText: {
        color: 'black',
    },
    font: {
        fontFamily: 'Helvetica Neue',
    },
    errorText: {
        fontFamily: 'Helvetica Neue',
        color: 'red',
        fontSize: 12,
        marginTop: -20,
        marginBottom: 12,
    },
})
