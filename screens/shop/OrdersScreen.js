import React from "react";
import { useEffect, useState, useCallback } from "react";
import { FlatList, StyleSheet, View, ActivityIndicator, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import OrderItem from "../../components/shop/OrderItem";
import Colors from "../../constants/Colors";
import { setOrders } from "../../store/actions/orders";

const OrdersScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.orders);

  const loadOrders = useCallback(async () => {
    setIsLoading(true);
    await dispatch(setOrders());
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", loadOrders);
    return unsubscribe;
  }, [navigation]);

  useEffect(loadOrders, [dispatch, loadOrders]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!orders.length) {
    return (
      <View style={styles.centered}>
        <Text>No orders found! Order something!</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem item={item} />}
    />
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default OrdersScreen;
