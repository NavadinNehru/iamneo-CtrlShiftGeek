import React, { forwardRef, Ref, useMemo } from "react";
import { ScrollView, StyleProp, StyleSheet, ViewStyle, ColorValue, Text, TouchableOpacity, View } from "react-native";
import { BottomSheetModal, BottomSheetBackdrop, BottomSheetScrollView } from "@gorhom/bottom-sheet";

type ModalProps = {
  children?: React.ReactNode;
  backgroundStyle?: StyleProp<ViewStyle>;
  onPress?: () => void; // Handler for button press
  buttonText?: string;  // Text for the button
  yes?:boolean;
  buttonDisable?: boolean;
  showDefaultIndicator : boolean ;
  buttonVisible?: boolean;
  extraFooter?: React.ReactNode;
};

const JobModal = forwardRef(({ children, backgroundStyle, onPress, buttonText,buttonDisable = false , buttonVisible = true ,showDefaultIndicator= true, extraFooter }: ModalProps, ref: Ref<BottomSheetModal>) => {
  let backgroundColor: ColorValue | undefined;
  if (backgroundStyle) {
    backgroundColor = StyleSheet.flatten(backgroundStyle).backgroundColor;
  }
  // console.log(extraFooter)
  const snapPoints = useMemo(() => ["91%"], []); // Set snap points to make the modal more flexible for scrolling

  return (
    <BottomSheetModal
    handleIndicatorStyle={!showDefaultIndicator ? {display:"none"} :{width:53,backgroundColor:'#1A2233',opacity:0.2}}
      ref={ref}
      snapPoints={snapPoints}
      backdropComponent={(props) => <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />}
      backgroundStyle={{ backgroundColor: backgroundColor || "#fff" }}
    
    >
      <BottomSheetScrollView
        contentContainerStyle={{ flexGrow: 1 }} // Allows scroll view to expand with content
        showsVerticalScrollIndicator={false}
      >
        {children}
      </BottomSheetScrollView>
      <View className="" style={styles.footerContainer}>
        <View className="pl-[16px] pr-[16px]" style={styles.footer}>
        <View className = " w-full">

        {extraFooter}
        </View>
          <TouchableOpacity className="rounded-[8px] mt-[8px] mb-[8px]" style={[styles.button , (buttonDisable ? styles.btnDisable : styles.btnEnable)]} onPress={onPress}
          disabled = {buttonDisable}
          >
            <Text className="text-white font-normal text-[14px] leading-[20px] pt-[10px] pb-[10px]" style={styles.buttonText}>
              {buttonText}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  footerContainer: {
    // flexGrow: 1,
    width: '100%',
  },
  footer: {
    width: '100%',
    position: 'absolute',
    bottom: 0,
    zIndex: 5000000000,
    backgroundColor: 'white',
    shadowColor: 'black',
    shadowOffset: { width: 5, height: 50 },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnDisable: {
    backgroundColor: '#929292',
  },
  btnEnable : {
    backgroundColor: '#1A2233',
  } ,
  button: {
    width: '100%',
    alignItems: 'center',
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Helvetica Neue',
    fontWeight: '400',
  },
});

export default JobModal;