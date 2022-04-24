import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ProductsOverviewScreen from "../screens/shop/ProductsOverviewScreen";

import { Platform } from "react-native";

import Colors from "../constants/Colors";
import ProductDetailScreen from "../screens/shop/ProductDetailScreen";
import HeaderButton from "../components/UI/HeaderButton";
import CartScreen from "../screens/shop/CartScreen";
import { StackNavigatorOptions } from "./ScreenOptions";

const Stack = createNativeStackNavigator();

const ProductsNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{ ...StackNavigatorOptions }}>
      <Stack.Screen
        name="ProductsOverview"
        component={ProductsOverviewScreen}
        options={({ navigation }) => ({
          title: "All Products",
          headerTitleAlign: "center",
          headerLeft: () => (
            <HeaderButton
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
          headerRight: () => (
            <HeaderButton
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              onPress={() => {
                navigation.navigate("Cart");
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="ProductDetail"
        component={ProductDetailScreen}
        options={({ route }) => ({
          title: route.params.title,
        })}
      />
      <Stack.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: "Cart",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProductsNavigator;
