import React from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Platform,
  TouchableNativeFeedback,
} from "react-native";

import Card from "../UI/Card";

const ProductItem = ({ item, onSelect, children }) => {
  const { imageUrl, price, title } = item;

  let Touchable = TouchableOpacity;

  if (Platform.OS === "android") {
    Touchable = TouchableHighlight;

    if (Platform.Version >= 21) {
      Touchable = TouchableNativeFeedback;
    }
  }

  return (
    <Card style={styles.product}>
      <View style={styles.touchable}>
        <Touchable onPress={onSelect} useForeground>
          <View>
            <View style={styles.imageContainer}>
              <Image source={{ uri: imageUrl }} style={styles.image} />
            </View>
            <View style={styles.details}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.price}>${price.toFixed(2)}</Text>
            </View>
            <View style={styles.actions}>{children}</View>
          </View>
        </Touchable>
      </View>
    </Card>
  );
};

const styles = StyleSheet.create({
  product: {
    margin: 20,
    height: 300,
  },
  touchable: {
    borderRadius: Platform.OS === "android" ? 10 : 20,
    overflow: "hidden",
  },
  imageContainer: {
    width: "100%",
    height: "60%",
    overflow: "hidden",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  title: {
    fontSize: 18,
    marginVertical: 3,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontSize: 14,
    color: "#888",
    fontFamily: "open-sans",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: "20%",
    paddingHorizontal: 20,
  },
  details: {
    alignItems: "center",
    height: "20%",
    padding: 10,
  },
});

export default ProductItem;
