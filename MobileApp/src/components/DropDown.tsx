import React, { useState,useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import ChevronDown from "../assets/icons/ChevronDown";
import Drop from '../assets/icons/Drop.svg';
import Modal from "./Modal";
import inputIcon from "../assets/images/input.png"; 

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

const DropDown: React.FC<DropDownInputProps> = ({
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
      <TouchableOpacity className="rounded-[8px]" style={[styles.inputContainer, inputBarStyle]} onPress={onInputBarPressed}>
        <Text className="text-[12px] font-[400]  text-left pl-[16px] pt-[8px] pb-[8px] " style={[styles.inputText, valueStyle,styles.font]}>{currentValue}</Text>
        <View className="pr-[18px] w-[16px] h-[16px]"style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Drop/>
        </View>
      </TouchableOpacity>

      <Modal visible={isFocused} onbackgroundTouchEnd={onModalBackgroundTouched}>
        <View style={styles.optionsContainer}>
          {options?.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.optionItem}
              onPress={() => onOptionSelected(item)}
            >
              <Text style={styles.optionText}>{item}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default DropDown;

const styles = StyleSheet.create({
  font:{
    fontFamily: 'Helvetica Neue',
  },
  container: {
    // width: "100%",
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10,
    // height: 35,
    borderWidth: 1,
    // borderRadius: 3,
    borderColor: "#999999",
    backgroundColor: "#FAFAFA",
  },
  inputIcon: {
    // width: 20,
    // height: 20,
    // marginRight: 10,
  },
  inputText: {
    flex: 1,
    // fontSize: 16,
    // paddingLeft:5,
    // paddingRight:10,
    color: "#999999",
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