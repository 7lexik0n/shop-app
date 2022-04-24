import React, { useState } from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import Colors from "../../constants/Colors";
import Card from "../UI/Card";

import CartItem from "./CartItem";

const OrderItem = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const { amount, cartItems } = item;

  return (
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${amount.toFixed(2)}</Text>
        <Text style={styles.date}>{item.readableDate}</Text>
      </View>
      <Button
        color={Colors.primary}
        title={showDetails ? "Hide Details" : "Show Details"}
        onPress={() => setShowDetails(!showDetails)}
      />
      {showDetails && (
        <View style={styles.detailsContainer}>
          {cartItems.map((cartItem) => (
            <CartItem item={cartItem} key={cartItem.id} />
          ))}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    margin: 20,
    padding: 10,
    alignItems: "center",
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 15,
  },
  amount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
  detailsContainer: {
    width: "100%",
  },
});

export default OrderItem;
