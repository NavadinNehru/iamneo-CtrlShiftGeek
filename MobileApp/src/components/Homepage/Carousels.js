import React from 'react';
import {Text, TouchableOpacity, View, Image, Dimensions, StyleSheet} from 'react-native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import OptionSVG from '../../assets/svg/HorizontalOption.svg';
// import PropTypes from 'prop-types';

const Carousels = ({data}) => {
  const staticProfileImg='https://cdn.dribbble.com/users/5534/screenshots/14230133/profile_4x.jpg';
  const [activeIndex, setActiveIndex] = React.useState(0);
  const navigation = useNavigation();

  const navigateToBlogDetails = (item) => {
    navigation.navigate('Blogdetail', {
      image: item.blog_Img.public_url,
      description: item.blog_description,
      title: item.blog_title,
      writer: item.writer_name,
      blogId: item._id,
    });
  };

  const renderItem = ({item}) => {
    if (!item?.blog_Img?.public_url) {
      return null;
    }
    return (
      <TouchableOpacity
        onPress={() => navigateToBlogDetails(item)}
        activeOpacity={0.8}
        className="border pb-4 border-[#EAEFF2] rounded">
        <Image
          className="w-full rounded h-[215.36px] mb-3"
          source={{uri: item.blog_Img.public_url}}
          onError={() => console.error('Failed to load image')}
        />
        <View className="px-2">
          <View className="flex flex-row justify-between items-center">
            <View className="flex flex-row justify-start items-center">
              <Image
                className="rounded-full w-[32px] h-[32px] mr-2"
                source={{
                  uri: staticProfileImg,
                }}
              />
              <Text className="font-medium text-[16px] text-black font-[Lato]">
                {item.writer_name}
              </Text>
            </View>
            <TouchableOpacity
              className="flex justify-center items-start"
              activeOpacity={0.8}>
              <OptionSVG />
            </TouchableOpacity>
          </View>
          <Text className="font-semibold mt-2 text-[16px] text-black font-[Lato]">
            {item.blog_title}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View className="flex-1 justify-center items-center">
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={Dimensions.get('window').width}
        itemWidth={325}
        onSnapToItem={index => setActiveIndex(index)}
        autoplay={true}
        autoplayDelay={500}
        autoplayInterval={3000}
      />
      <Pagination
        dotsLength={data?.length || 0}
        activeDotIndex={activeIndex}
        dotStyle={{
          width: 6,
          height: 6,
          borderRadius: 5,
          marginHorizontal: 1,
          backgroundColor: '#0D69D7',
        }}
        inactiveDotOpacity={0.2}
        inactiveDotScale={1}
        dotColor="#0D69D7"
        inactiveDotColor="#D9D9D9"
      />
    </View>
  );
};

// Carousels.propTypes = {
//   data: PropTypes.arrayOf(
//     PropTypes.shape({
//       blog_Img: PropTypes.shape({
//         public_url: PropTypes.string,
//       }),
//       blog_description: PropTypes.string,
//       blog_title: PropTypes.string,
//       writer_name: PropTypes.string,
//       _id: PropTypes.string,
//     }),
//   ).isRequired,
// };

// Carousels.defaultProps = {
//   data: [],
// };

const styles = StyleSheet.create({
  dotStyle: {
    width: 6,
    height: 6,
    borderRadius: 5,
    marginHorizontal: 1,
    backgroundColor: '#0D69D7',
  },
});

export default React.memo(Carousels);
