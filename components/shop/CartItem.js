import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const CartItem = ({ item, onRemove, deletable }) => {
  const { title, count, sum } = item;

  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{count} </Text>
        <Text style={styles.text} ellipsizeMode="tail" numberOfLines={1}>
          {title}
        </Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.text}>${sum.toFixed(2)}</Text>
        {deletable && (
          <TouchableOpacity onPress={onRemove} style={styles.deleteButton}>
            <Ionicons
              name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
              size={23}
              color="tomato"
            />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 5,
    borderRadius: 5,
  },
  itemData: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  text: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
    maxWidth: 200,
  },
  deleteButton: {
    marginLeft: 20,
  },
});

export default CartItem;
