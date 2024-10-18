import React from "react";
import { ColorValue, GestureResponderEvent, Modal as ModalReactNative, StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type ModalProps = {
    visible?: boolean;
    transparent?: boolean;
    children?: React.JSX.Element;
    backgroundStyle?: StyleProp<ViewStyle>;
    onBackgroundTouchStart?: ((event: GestureResponderEvent) => void);
    onbackgroundTouchEnd?: ((event: GestureResponderEvent) => void);
}

const Modal:React.FC<ModalProps> = ({
    visible,
    transparent = true,
    children,
    backgroundStyle,
    onBackgroundTouchStart,
    onbackgroundTouchEnd,
}) => {
    let backgroundColor: ColorValue | undefined;
    if(backgroundStyle) {
        backgroundColor = StyleSheet.flatten(backgroundStyle).backgroundColor;
    }
    return (
        <ModalReactNative
            visible={visible}
            transparent={transparent}
            animationType="slide"
            statusBarTranslucent
        >
            <View
                style={[
                    {
                        width: "100%",
                        height: "100%",
                        backgroundColor: "#00000038",
                        position: "absolute",
                    },
                    backgroundStyle
                ]}
                onTouchStart={(event) => {
                    console.log("onTouchStart");
                    if(onBackgroundTouchStart) {
                        onBackgroundTouchStart(event);
                    }
                }}

                onTouchEnd={(event) => {
                    if(onbackgroundTouchEnd) {
                        onbackgroundTouchEnd(event);
                    }
                }}
            ></View>

            <View
                style={[
                    {
                        position: "absolute",
                        bottom: 0,
                        width: "100%",
                        height: "auto",
                        backgroundColor: "#fff",
                        borderTopLeftRadius: 12,
                        borderTopRightRadius: 12,
                    }
                ]}
            >
                {
                    children ? children : null
                }
            </View>
        </ModalReactNative>
    )
}

export default Modal;