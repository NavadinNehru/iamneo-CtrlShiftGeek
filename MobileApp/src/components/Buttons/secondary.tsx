import React from 'react';
import {Button, StyleProp, StyleSheet, Text, TouchableOpacity, ViewStyle} from 'react-native';

type Props = {
  children?: any;
  title?: String;
  onPress ?:any;
  containerStyle?: StyleProp<ViewStyle>;
  containerClassName?: string;
  titleStyle?: StyleProp<ViewStyle>;
  titleClassName?: string;
};
export default function SecondaryButton({
  children,
  title,
  onPress,
  containerStyle,
  containerClassName,
  titleStyle,
  titleClassName
}: Props) {
  return (
    <TouchableOpacity 
      onPress={onPress}
      style={[{}, styles.button, containerStyle && containerStyle]}
      className={`${containerClassName}`}  
    >
      {children && children}
      {title && <Text style={[styles.text, titleStyle]} className={`${titleClassName}`} >{title}</Text>}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width:'45%',
    flex:1,
    justifyContent:'center',
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  text: {
    color: '#08090A',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
  },
});
