import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import HeaderButton from "../components/UI/HeaderButton";
import OrdersScreen from "../screens/shop/OrdersScreen";
import { StackNavigatorOptions } from "./ScreenOptions";

const Stack = createNativeStackNavigator();

const OrdersNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...StackNavigatorOptions,
      }}
    >
      <Stack.Screen
        name="OrdersScreen"
        component={OrdersScreen}
        options={({ navigation }) => ({
          title: "Orders",
          headerTitleAlign: "center",
          headerLeft: () => (
            <HeaderButton
              name={Platform.OS === "android" ? "md-menu" : "ios-menu"}
              onPress={() => {
                navigation.toggleDrawer();
              }}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default OrdersNavigator;
