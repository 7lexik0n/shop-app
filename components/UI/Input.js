import React, { useReducer, useEffect } from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

const INPUT_CHANGE = "INPUT_CHANGE";
const INPUT_BLUR = "INPUT_BLUR";

const inputReducer = (state, action) => {
  const { type } = action;

  switch (type) {
    case INPUT_CHANGE: {
      const { value, isValid } = action;

      return {
        ...state,
        value,
        isValid,
      };
    }
    case INPUT_BLUR: {
      return {
        ...state,
        touched: true,
      };
    }
    default:
      return state;
  }
};

const Input = ({
  id,
  initialValue,
  initialValid,
  label,
  errorText,
  required,
  email,
  min,
  max,
  minLength,
  onInputChange,
  ...props
}) => {
  const [state, dispatch] = useReducer(inputReducer, {
    value: initialValue ? initialValue : "",
    isValid: initialValid,
    touched: false,
  });

  const { value, isValid, touched } = state;

  useEffect(() => {
    if (touched) {
      onInputChange(id, value, isValid);
    }
  }, [state, onInputChange, id]);

  const textChangeHandler = (text) => {
    let isValid = true;
    const emailRegex =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (required && text.trim().length === 0) {
      isValid = false;
    }
    if (email && !emailRegex.test(text.toLowerCase())) {
      isValid = false;
    }
    if (min != null && +text < min) {
      isValid = false;
    }
    if (max != null && +text > max) {
      isValid = false;
    }
    if (minLength != null && text.length < minLength) {
      isValid = false;
    }

    dispatch({
      type: INPUT_CHANGE,
      value: text,
      isValid,
    });
  };

  const onInputBlurHandler = () => {
    dispatch({
      type: INPUT_BLUR,
    });
  };

  return (
    <View style={styles.formControl}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        {...props}
        style={styles.input}
        value={value}
        onChangeText={textChangeHandler}
        onBlur={onInputBlurHandler}
      />
      {!isValid && touched && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{errorText}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 10,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  errorContainer: {
    marginVertical: 5,
  },
  errorText: {
    fontFamily: "open-sans",
    color: "tomato",
    fontSize: 13,
  },
});

export default Input;
