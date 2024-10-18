import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity ,ScrollView} from "react-native";
import Modal from "./Modal";
import Cr1 from '../assets/icons/Cr1.svg';
import Cr2 from '../assets/icons/Cr2.svg';
type DropDownInputProps = {
  label?: string;
  labelStyle?: any;
  value: string;
  options: string[];
  valueStyle?: any;
  inputBarStyle?: any;
  style?: any;
  onOptionChanged?: ((text: string) => void);
}

const DropDownInput: React.FC<DropDownInputProps> = ({
  label,
  labelStyle,
  value,
  valueStyle,
  options,
  inputBarStyle,
  style,
  onOptionChanged,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(value ? value : "");

  useEffect(() => {
    if (onOptionChanged) {
      onOptionChanged(currentValue);
    }
  }, [currentValue]);

  function onModalBackgroundTouched() {
    setIsFocused(false);
  }

  function onInputBarPressed() {
    setIsFocused(true);
  }

  function onOptionSelected(text: string) {
    setCurrentValue(text);
    setIsFocused(false);
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity className="h-[48px] pl-[12px] pr-[12px] rounded-[8px]" style={[styles.inputContainer, inputBarStyle]} onPress={onInputBarPressed}>
        {/* <Image source={inputIcon} style={styles.inputIcon} /> */}
        <Cr1/>
        <Text style={[styles.inputText, valueStyle,styles.font]} className="text-[14px] font-[500] leading-[20px] text-left">{currentValue}</Text>
        <Cr2/>
      </TouchableOpacity>

      <Modal visible={isFocused} onbackgroundTouchEnd={onModalBackgroundTouched}>
        <View style={{height:250}}>

        <ScrollView contentContainerStyle={styles.optionsContainer}>
          {options?.map((item, index) => (
            <TouchableOpacity
            key={index}
              style={styles.optionItem}
              onPress={() => onOptionSelected(item)}
              >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        </View>
      </Modal>
    </View>
  );
};

export default DropDownInput;

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Helvetica Neue',
  },
  container: {
    width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 16,
    // height: 48,
    borderWidth: 1,
    // borderRadius: 4,
    borderColor: "black",
    backgroundColor: "#F2F2F2",
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  inputText: {
    flex: 1,
    color: "#737780",
    marginLeft:10,
  },
  optionsContainer: {
    width: "100%",
    alignItems: "center",
    paddingVertical: 24,
  },
  optionItem: {
    width: "100%",
    marginBottom: 20,
  },
  optionText: {
    color: "#08090A",
    fontSize: 16,
    fontWeight: "400",
    width: "100%",
    textAlign: "center",
  },
});