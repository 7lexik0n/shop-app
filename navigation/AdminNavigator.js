import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Platform } from "react-native";
import HeaderButton from "../components/UI/HeaderButton";
import UserProductsScreen from "../screens/user/UserProductsScreen";
import EditProductScreen from "../screens/user/EditProductScreen";
import { StackNavigatorOptions } from "./ScreenOptions";

const Stack = createNativeStackNavigator();

const AdminNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...StackNavigatorOptions,
      }}
    >
      <Stack.Screen
        name="UserProducts"
        component={UserProductsScreen}
        options={({ navigation }) => ({
          title: "Your Products",
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
              name={Platform.OS === "android" ? "md-create" : "ios-create"}
              onPress={() => {
                navigation.navigate("EditProductScreen");
              }}
            />
          ),
        })}
      />
      <Stack.Screen
        name="EditProductScreen"
        component={EditProductScreen}
        options={({ route }) => {
          const id = route.params ? route.params.id : null;

          return {
            headerTitleAlign: "center",
            title: id ? "Edit Product" : "Add Product",
          };
        }}
      />
    </Stack.Navigator>
  );
};

export default AdminNavigator;
