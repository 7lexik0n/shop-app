import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Text,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import ProductItem from "../../components/shop/ProductItem";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProductsScreen = ({ navigation }) => {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userProducts = useSelector((state) => state.products.userProducts);
  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      Alert.alert("An error is occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const onEditPressHandler = (id) => {
    navigation.navigate("EditProductScreen", {
      id,
    });
  };

  const onDeletePressHandler = (id) => {
    Alert.alert(
      "Are you sure?",
      "Do you really want to delete this item?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: async () => {
            setError(null);
            setIsLoading(true);

            try {
              await dispatch(deleteProduct(id));
            } catch (err) {
              setError(err.message);
            }

            setIsLoading(false);
          },
        },
      ],
      {
        cancelable: true,
      }
    );
  };

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!userProducts.length) {
    return (
      <View style={styles.centered}>
        <Text>No products found! Start creating some.</Text>
      </View>
    );
  }

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => {
        return (
          <ProductItem item={item} onSelect={() => onEditPressHandler(item.id)}>
            <Button
              color={Colors.primary}
              title="Edit"
              onPress={() => onEditPressHandler(item.id)}
            />
            <Button
              color={Colors.primary}
              title="Delete"
              onPress={() => onDeletePressHandler(item.id)}
            />
          </ProductItem>
        );
      }}
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

export default UserProductsScreen;
