import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import LottieView from 'lottie-react-native'
import gift from '../../assets/lottie/gifte.json';
import wel from '../../assets/lottie/wel.json';
import security from '../../assets/images/security.png';
import thr from '../../assets/images/thr.png';
import badge from '../../assets/images/badge.png';
import sel from '../../assets/images/sel.png';
import Carousel from './Carousel';
import car1 from '../../assets/images/car1.jpg';
import car2 from '../../assets/images/car2.jpg';
import car3 from '../../assets/images/car3.jpg';
import car4 from '../../assets/images/car4.jpg';
const HomeLearn = () => {
  const carouselData = [
    {
      image: car1,
      title: 'Winner Smart India Hackathon',
      description: 'Ctrlshiftgeek emerged as winners of smart india hackathon 2023',
    },
    {
      image: car2,
      title: 'Fintech',
      description: 'Selected of Fintech, top 20 teams in india',
    },
    {
      image: car3,
      title: 'Scale 91',
      description: 'Selected of scale 91, top 10 teams in india',
    },
    {
      image: car4,
      title: 'Pentathon',
      description: 'Participated in pentathon with award recognition',
    },
  ];
  const WelcomeMessage = () => {
    return (
      <View style={{paddingLeft:20,paddingTop:10}}>
        <Text style={[{fontSize:18,color:'black',fontWeight:'600',letterSpacing:0.2},styles.font]}>
          Welcome to <Text style={styles.blueText}>Rog Chatbot</Text>
        </Text>
        <Text style={[{fontSize:18,color:'black',fontWeight:'600',letterSpacing:0.2},styles.font]}>
          <Text style={styles.blueText}>CtrlShiftGeek</Text> is our team
        </Text>
      </View>
    );
  };
  return (
    <ScrollView contentContainerStyle={styles.container}>
        <LinearGradient
          colors={['#CFEBD7','#fff',]}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          style={styles.first}>
          {Platform.OS === 'ios' && <View style={styles.iosHeader} />}
          <WelcomeMessage/>
          <LottieView source={require('./Animation - 1729094724248.json')} autoPlay loop style={{height:180,width:250,marginTop:-10}}/>
          <TouchableOpacity style={{justifyContent:'center',alignItems:'center',alignSelf:'center',width:'90%',backgroundColor:'black',borderRadius:4}}>
            <Text style={[{color:'white',fontSize:15,paddingVertical:8},styles.font]}>Getting  Started</Text>
          </TouchableOpacity>
        </LinearGradient>

    <View style={{paddingLeft:20,marginTop:17}}>
          <Text style={[{color:'black',fontSize:18,fontWeight:'600'},styles.font]}>Features</Text>

          <View style={{marginTop: 8, flexWrap: 'wrap', width: '100%', flexDirection: 'row', gap: 22}}>

          <TouchableOpacity style={{flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F8F9FA', height: 55, width: 60, borderRadius: 4,justifyContent:'center',alignItems:'center'}}>
            <Image source={thr} style={{height:30,width:30}} />
          </View>
          <Text style={[{color: 'black', fontSize: 12, fontWeight: '400'}, styles.font]}>security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F8F9FA', height: 55, width: 60, borderRadius: 4,justifyContent:'center',alignItems:'center'}}>
            <Image source={security} style={{height:30,width:30}} />
          </View>
          <Text style={[{color: 'black', fontSize: 12, fontWeight: '400'}, styles.font]}>security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F8F9FA', height: 55, width: 60, borderRadius: 4,justifyContent:'center',alignItems:'center'}}>
            <Image source={sel} style={{height:30,width:30}} />
          </View>
          <Text style={[{color: 'black', fontSize: 12, fontWeight: '400'}, styles.font]}>security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F8F9FA', height: 55, width: 60, borderRadius: 4,justifyContent:'center',alignItems:'center'}}>
            <Image source={badge} style={{height:30,width:30}} />
          </View>
          <Text style={[{color: 'black', fontSize: 12, fontWeight: '400'}, styles.font]}>security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F8F9FA', height: 55, width: 60, borderRadius: 4,justifyContent:'center',alignItems:'center'}}>
            <Image source={sel} style={{height:30,width:30}} />
          </View>
          <Text style={[{color: 'black', fontSize: 12, fontWeight: '400'}, styles.font]}>security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F8F9FA', height: 55, width: 60, borderRadius: 4,justifyContent:'center',alignItems:'center'}}>
            <Image source={badge} style={{height:30,width:30}} />
          </View>
          <Text style={[{color: 'black', fontSize: 12, fontWeight: '400'}, styles.font]}>security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F8F9FA', height: 55, width: 60, borderRadius: 4,justifyContent:'center',alignItems:'center'}}>
            <Image source={thr} style={{height:30,width:30}} />
          </View>
          <Text style={[{color: 'black', fontSize: 12, fontWeight: '400'}, styles.font]}>security</Text>
        </TouchableOpacity>

        <TouchableOpacity style={{flexDirection: 'column', gap: 3, justifyContent: 'center', alignItems: 'center'}}>
          <View style={{backgroundColor: '#F8F9FA', height: 55, width: 60, borderRadius: 4,justifyContent:'center',alignItems:'center'}}>
            <Image source={security} style={{height:30,width:30}} />
          </View>
          <Text style={[{color: 'black', fontSize: 12, fontWeight: '400'}, styles.font]}>security</Text>
        </TouchableOpacity>

        </View>
        </View>

        <View style={{marginTop:17}}>
        <Text style={[{color:'black',fontSize:18,fontWeight:'600',paddingLeft:20},styles.font]}>Team Milestones</Text>
          <Carousel data={carouselData} />
        </View>

    </ScrollView>
  )
}

export default HomeLearn

const styles = StyleSheet.create({
  container:{
    // flex:1,
    backgroundColor:'white'
  },
  first:{
    height:300,
  },
  blueText: {
    color: '#0D69D7',
    fontSize:19
  },
  blackText: {
    color: 'black',
  },
  font:{
    fontFamily: 'Helvetica Neue',
  },
})