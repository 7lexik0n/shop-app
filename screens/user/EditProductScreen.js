import React, {
  useCallback,
  useLayoutEffect,
  useReducer,
  useEffect,
  useState,
} from "react";
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import HeaderButton from "../../components/UI/HeaderButton";
import Input from "../../components/UI/Input";
import Colors from "../../constants/Colors";
import { createProduct, updateProduct } from "../../store/actions/products";

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

const EditProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (error) {
      Alert.alert("An error is occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const id = route.params ? route.params.id : null;
  const product = useSelector((state) =>
    state.products.userProducts.find((product) => product.id === id)
  );

  const [formState, formDispatch] = useReducer(formReducer, {
    inputValues: {
      title: product ? product.title : "",
      imageUrl: product ? product.imageUrl : "",
      description: product ? product.description : "",
      price: "",
    },
    inputValidities: {
      title: !!product,
      imageUrl: !!product,
      description: !!product,
      price: !!product,
    },
    formIsValid: !!product,
  });

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

  useLayoutEffect(() => {
    const data = formState.inputValues;
    const formIsValid = formState.formIsValid;

    navigation.setOptions({
      headerRight: () => (
        <HeaderButton
          name={Platform.OS === "android" ? "md-checkmark" : "ios-checkmark"}
          onPress={async () => {
            if (formIsValid) {
              setIsLoading(true);
              setError(null);

              try {
                if (id) {
                  await dispatch(updateProduct(id, data));
                } else {
                  await dispatch(createProduct(data));
                }

                navigation.navigate("UserProducts");
              } catch (err) {
                setError(err.message);
                setIsLoading(false);
              }

            } else {
              Alert.alert(
                "Form is Invalid!",
                "Please, check the errors in the form.",
                [{ text: "Okay" }]
              );
            }
          }}
        />
      ),
    });
  }, [navigation, formState]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  const {
    inputValues: { title, imageUrl, description, price },
    inputValidities: {
      title: titleIsValid,
      imageUrl: imageUrlIsValid,
      description: descriptionIsValid,
      price: priceIsValid,
    },
  } = formState;

  return (
    <KeyboardAvoidingView
      style={styles.keyboard}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="title"
            initialValue={title}
            initialValid={titleIsValid}
            label="Title"
            errorText="Please, enter a valid title!"
            onInputChange={inputChangeHandler}
            required
            autoCapitalize="sentences"
            returnKeyType="next"
            autoCorrect={false}
          />
          <Input
            id="imageUrl"
            initialValue={imageUrl}
            initialValid={imageUrlIsValid}
            label="Image URL"
            errorText="Please, enter a valid image url!"
            onInputChange={inputChangeHandler}
            required
            returnKeyType="next"
            autoCorrect={false}
          />
          {product ? null : (
            <Input
              id="price"
              initialValue={price}
              initialValid={priceIsValid}
              label="Price"
              errorText="Please, enter a valid price!"
              onInputChange={inputChangeHandler}
              required
              min={0.1}
              returnKeyType="next"
              autoCorrect={false}
              keyboardType="decimal-pad"
            />
          )}
          <Input
            id="description"
            initialValue={description}
            initialValid={descriptionIsValid}
            label="Description"
            errorText="Please, enter a valid description!"
            onInputChange={inputChangeHandler}
            required
            minLength={5}
            returnKeyType="done"
            autoCorrect={false}
            autoCapitalize="sentences"
            multiline
            numberOfLines={3}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboard: {
    flex: 1,
  },
  form: {
    margin: 20,
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default EditProductScreen;
