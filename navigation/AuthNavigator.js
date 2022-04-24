import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StartupScreen from "../screens/StartupScreen";
import AuthScreen from "../screens/user/AuthScreen";
import { StackNavigatorOptions } from "./ScreenOptions";

const Stack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        ...StackNavigatorOptions,
      }}
    >
      <Stack.Screen
        name="StartupScreen"
        component={StartupScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="AuthScreen"
        component={AuthScreen}
        options={{
          headerTitleAlign: "center",
          title: "Authenticate",
          headerBackVisible: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default AuthNavigator;
