import React from "react";
import { View, StyleSheet, TouchableNativeFeedback } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Platform } from "react-native";
import Colors from "../../constants/Colors";
import { TouchableOpacity } from "react-native";

const HeaderButton = ({ name, onPress }) => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === "android" && Platform.Version > 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <TouchableCmp
      activeOpacity={0.65}
      onPress={onPress}
      background={
        Platform.OS === "android"
          ? TouchableNativeFeedback.Ripple("rgba(255,255,255,0.25)", true, 20)
          : ""
      }
    >
      <View style={styles.iconContainer}>
        <Ionicons
          name={name}
          size={23}
          color={Platform.OS === "android" ? "white" : Colors.primary}
        />
      </View>
    </TouchableCmp>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    overflow: "hidden",
  },
});

export default HeaderButton;
