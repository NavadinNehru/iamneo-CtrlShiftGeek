import {
  StyleSheet,
  Text,
  View,
  TextInput,
  StyleProp,
  TextStyle,
  ViewStyle,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, {useState} from 'react';
import Eye from '../../assets/icons/eye';

type Props = {
  value: string;
  setValue: any;
  prefixIcon?: any;
  textStyle?: StyleProp<TextStyle>;
  containerStyle?: StyleProp<ViewStyle>;
  label?: any;
  labelStyle?: StyleProp<TextStyle>;
  placeholder?: any;
  multiline?: boolean;
  password?: boolean;
  numberOfLines?: number;
};

const Input = ({
  value,
  setValue,
  prefixIcon,
  textStyle,
  containerStyle,
  label,
  placeholder,
  labelStyle,
  multiline,
  password,
  numberOfLines,
  ...props
}: Props) => {
  const [visible, setVisible] = useState(password ? true : false);
  const handleVisible = () => {
    setVisible(!visible);
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={[styles.container, containerStyle && containerStyle]}>
          {label && <Text style={[styles.label, labelStyle]}> {label} </Text>}
          <View style={styles.wrapper}>
            {prefixIcon && (
              <View style={styles.iconContainer}>{prefixIcon}</View>
            )}
            <TextInput
              multiline={multiline}
              value={value}
              onChangeText={setValue}
              style={[textStyle && textStyle, styles.textInputStyle]}
              placeholderTextColor="#858585"
              secureTextEntry={visible}
              {...props}
              placeholder={placeholder ? placeholder : ''}
              numberOfLines={numberOfLines}
            />
            {password && (
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={handleVisible}>
                <Eye />
              </TouchableOpacity>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default React.memo(Input);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#CED4DA',
  },
  label: {
    color: 'black',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 8,
  },
  iconContainer: {marginRight: 8},
  textInputStyle: {
    color: 'black',
    fontFamily: 'Lato',
    fontSize: 14,
    fontStyle: 'normal',
    fontWeight: '400',
    lineHeight: null,
    paddingHorizontal: 16,
    paddingVertical: 13,
    width: '87%',
  },
});
