import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Button,
  Text,
  ActivityIndicator,
} from "react-native";

import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import * as CartActions from "../../store/actions/cart";
import { setProducts } from "../../store/actions/products";

const ProductsOverviewScreen = ({ navigation }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const loadProducts = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(setProducts());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", async () => {
      setIsLoading(true);
      await loadProducts();
      setIsLoading(false);
    });
    return unsubscribe;
  }, [navigation]);

  useEffect(async () => {
    setIsLoading(true);
    await loadProducts();
    setIsLoading(false);
  }, [dispatch, loadProducts]);

  const products = useSelector((state) => state.products.availableProducts);

  const onDetailsPressHandler = (title, id) => {
    navigation.navigate("ProductDetail", {
      title,
      id,
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Text>{error}</Text>
        <Button
          color={Colors.primary}
          title="Try Again"
          onPress={loadProducts}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && products.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No products found. Add first product!</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        onRefresh={loadProducts}
        refreshing={isRefreshing}
        data={products}
        renderItem={({ item }) => {
          return (
            <ProductItem
              item={item}
              onSelect={() => onDetailsPressHandler(item.title, item.id)}
            >
              <Button
                color={Colors.primary}
                title="View Details"
                onPress={() => onDetailsPressHandler(item.title, item.id)}
              />
              <Button
                color={Colors.primary}
                title="To Cart"
                onPress={() => dispatch(CartActions.addToCart(item))}
              />
            </ProductItem>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ProductsOverviewScreen;
