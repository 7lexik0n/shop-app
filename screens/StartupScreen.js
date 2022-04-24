import React, { useEffect } from "react";
import { View, StyleSheet, ActivityIndicator } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Colors from "../constants/Colors";
import { useDispatch } from "react-redux";
import { authenticate, LOGIN } from "../store/actions/auth";

const StartupScreen = ({ navigation }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const tryLogin = async () => {
      try {
        const userData = await AsyncStorage.getItem("userData");

        if (!userData) {
          navigation.navigate("AuthScreen");
          return;
        }

        const transformedData = JSON.parse(userData);
        const { token, userId, expiryDate } = transformedData;
        const expirationDate = new Date(expiryDate);

        if (expirationDate <= new Date() || !token || !userId) {
          navigation.navigate("AuthScreen");
          return;
        }

        const expirationTime = expirationDate.getTime() - new Date().getTime();

        dispatch(authenticate(token, userId, expirationTime));
      } catch (err) {
        console.log(err.message);
        navigation.navigate("AuthScreen");
      }
    };

    tryLogin();
  }, [dispatch]);

  return (
    <View style={styles.screen}>
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default StartupScreen;
