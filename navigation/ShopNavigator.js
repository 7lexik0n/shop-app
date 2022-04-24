import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { Platform } from "react-native";
import Colors from "../constants/Colors";
import OrdersNavigator from "./OrdersNavigator";
import ProductsNavigator from "./ProductsNavigator";
import { Ionicons } from "@expo/vector-icons";
import AdminNavigator from "./AdminNavigator";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/auth";

const Drawer = createDrawerNavigator();

const CustomDrawerContent = (props) => {
  const dispatch = useDispatch();

  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem
        label="Logout"
        labelStyle={{
          fontFamily: "open-sans-bold",
        }}
        icon={({ color }) => (
          <Ionicons
            name={Platform.OS === "android" ? "md-log-out" : "ios-log-out"}
            size={23}
            color={color}
          />
        )}
        onPress={() => {
          dispatch(logout());
        }}
      />
    </DrawerContentScrollView>
  );
};
const ShopNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: Colors.primary,
        drawerLabelStyle: {
          fontFamily: "open-sans-bold",
        },
      }}
    >
      <Drawer.Screen
        name="ProductsNavigator"
        component={ProductsNavigator}
        options={{
          drawerLabel: "All Products",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-cart" : "ios-cart"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="OrdersNavigator"
        component={OrdersNavigator}
        options={{
          drawerLabel: "Orders",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-list" : "ios-list"}
              size={23}
              color={color}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="AdminNavigator"
        component={AdminNavigator}
        options={{
          drawerLabel: "Admin",
          drawerIcon: ({ color }) => (
            <Ionicons
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              size={23}
              color={color}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

export default ShopNavigator;
