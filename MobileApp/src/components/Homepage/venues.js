import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import Star from '../../assets/images/star.png';

const Venues = ({data}) => {
  const navigation = useNavigation();

  const OnPress = () => {
    navigation.navigate('SalonDetail', {
      salonData: data,
    });
    console.log("giga chad",data);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.8}
        className="border ml-4 w-[280px] flex flex-col border-[#EAEFF2] rounded"
        onPress={OnPress}>
        <Image
          className="w-[280px] rounded h-[172px]"
          source={{
            uri:
              data.salon_Img !== undefined
                ? Array.isArray(data.salon_Img)
                  ? data.salon_Img.find(item => item.isPrimary === true)
                      ?.public_url
                  : data.salon_Img?.public_url
                : data.salon_image.public_url,
          }}
        />
        <View className="flex flex-col gap-2 p-4">
          <Text className="font-[Lato-Bold] font-[600] text-[16px] text-[#08090A]">
            {data.salon_name}
          </Text>
          <View className="flex flex-row items-center ">
            <Text className="font-[Lato-Bold] font-[600] text-[14px] mr-[4px] text-[#08090A]">
              {data.rating}
            </Text>
            <Image className="w-[12] h-[12] " source={Star} />

            <Text className="ml-2 font-[Lato] font-[400] text-[14px] text-[#08090A]">
              {`(${data.total_rating || 4} ratings)`}
            </Text>
          </View>
          <Text
            className="font-[Lato] font-[400] text-[14px] text-[#08090A]"
            style={styles.locationText}>
            {data.locationText}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(Venues);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  locationText: {
    fontFamily: 'Lato-Regular',
  },
});
