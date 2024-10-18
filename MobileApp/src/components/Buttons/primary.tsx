import React from 'react';
import {
  Button,
  StyleProp,
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

type Props = {
  children?: any;
  title?: String;
  containerStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress?: () => void;
  textStyle?: StyleProp<TextStyle>;
};
export default function PrimaryButton({
  children,
  title,
  containerStyle,
  disabled,
  onPress,
  textStyle,
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        containerStyle && containerStyle,
        disabled
          ? {
              backgroundColor: '#EBEDF0',
            }
          : null,
      ]}
      disabled={disabled}
      onPress={() => {
        if (onPress) {
          onPress();
        }
      }}>
      {children && children}
      {title && (
        <Text
          style={[
            styles.text,
            textStyle && textStyle,
            disabled
              ? {
                  color: '#939CA3',
                }
              : null,
          ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#08080B',
    borderRadius: 5,
  },
  text: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    fontSize: 16,
    fontFamily: 'Poppins',
  },
});
