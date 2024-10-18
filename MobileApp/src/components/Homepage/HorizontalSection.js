import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  ActivityIndicator,
} from 'react-native';
import Right_arrow from '../../assets/images/blue_arrow.png';
import Venues from './venues';
import {useRef, useState} from 'react';

const Horizontal_section = ({title, data}) => {
  const scrollViewRef = useRef(null);
  const [scrollX, setScrollX] = useState(0);

  const scrollXUnitsAhead = () => {
    const currentX = scrollX;
    const newX = currentX + 296;
    scrollViewRef.current.scrollTo({x: newX, y: 0, animated: true});
  };

  return (
    <View style={styles.container}>
      <View className="flex justify-between px-4 mt-8 mb-6 items-center flex-row">
        <Text className="font-medium font-[Poppins-SemiBold] text-[20px] text-[#000000]">
          {title}
        </Text>
        <TouchableOpacity
          className="flex z-40 items-center"
          onPress={() => {
            scrollXUnitsAhead();
          }}>
          <Right_arrow />
        </TouchableOpacity>
      </View>
      <View style={styles.scrollViewContainer}>
        <ScrollView
          horizontal={true}
          className="flex pb-4 flex-row"
          ref={scrollViewRef}
          onScroll={event => {
            setScrollX(event.nativeEvent.contentOffset.x);
          }}
          scrollEventThrottle={16}>
          {data ? (
            data.map(item => {
              return <Venues key={item._id} data={item} />;
            })
          ) : (
            <View style={styles.loaderContainer}>
              <ActivityIndicator color={'#0D69D7'} size="small" />
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loaderContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default React.memo(Horizontal_section);
