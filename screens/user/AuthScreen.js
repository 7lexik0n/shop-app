import React, { useState, useReducer, useCallback, useEffect } from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Alert,
  Platform,
} from "react-native";

import { useDispatch } from "react-redux";

import { LinearGradient } from "expo-linear-gradient";

import Input from "../../components/UI/Input";
import Card from "../../components/UI/Card";
import Colors from "../../constants/Colors";

import { signup, login } from "../../store/actions/auth";

const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

const formReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case FORM_INPUT_UPDATE: {
      const { value, isValid, input } = action;
      const { inputValues, inputValidities } = state;

      const updatedValues = { ...inputValues, [input]: value };
      const updatedValidities = { ...inputValidities, [input]: isValid };

      let formIsValid = true;
      for (const key in updatedValidities) {
        formIsValid = formIsValid && updatedValidities[key];
      }

      return {
        ...state,
        inputValues: updatedValues,
        inputValidities: updatedValidities,
        formIsValid,
      };
    }
    default:
      state;
  }
};

const AuthScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: "",
    },
    inputValidities: {
      email: false,
      password: false,
    },
    formIsValid: false,
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [
        {
          text: "Okay",
          onPress: () => {
            setError(null);
          },
        },
      ]);
    }
  }, [error]);

  const inputChangeHandler = useCallback(
    (inputType, text, isValid) =>
      formDispatch({
        type: FORM_INPUT_UPDATE,
        value: text,
        isValid,
        input: inputType,
      }),
    [formDispatch]
  );

  const {
    inputValues: { email, password },
    inputValidities: { email: emailIsValid, password: passwordIsValid },
    formIsValid,
  } = formState;

  const authHanlder = async () => {
    if (formIsValid) {
      const action = isSignup
        ? signup(email, password)
        : login(email, password);

      setError(null);
      setIsLoading(true);
      try {
        await dispatch(action);
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "android" ? 15 : 35}
      style={styles.screen}
    >
      <LinearGradient colors={["#ffedff", "#ffe3ff"]} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue={email}
              initialValid={emailIsValid}
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              required
              minLength={6}
              secureTextEntry
              autoCapitalize="none"
              errorText="Please enter a valid password address."
              onInputChange={inputChangeHandler}
              initialValue={password}
              initialValid={passwordIsValid}
            />
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? "Sign Up" : "Login"}
                  color={Colors.primary}
                  onPress={authHanlder}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(!isSignup);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20,
  },
  gradient: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonContainer: {
    marginTop: 10,
  },
});

export default AuthScreen;
