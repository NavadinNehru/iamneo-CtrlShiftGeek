import {Text, View, Image, TouchableOpacity, StyleSheet} from 'react-native';
import React from 'react';
import {SvgUri} from 'react-native-svg';

const Category = (props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.cards}
        className="flex justify-start items-center"
        onPress={() => {
          props.onPress(props.name);
        }}>
        <View
          style={styles.icon}
          className="flex bg-[#F8F9FA] justify-center items-center">
          <SvgUri
            width={24}
            height={24}
            // className="w-[24px] h-[24px]"
            uri={props.img}
          />
        </View>
        <Text className="font-normal mt-2 text-[12px] max-w-[72px] text-black font-[Lato]">
          {props.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default React.memo(Category);

const styles = StyleSheet.create({
  container: {
    // flex: 1,
  },
  cards: {
    width: 72,
    // height: 94,
    margin: 4,
  },
  icon: {
    width: 72,
    height: 72,
  },
});
