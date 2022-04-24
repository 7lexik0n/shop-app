import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { useSelector } from "react-redux";
import AuthNavigator from "./AuthNavigator";
import ShopNavigator from "./ShopNavigator";

const MainNavigator = () => {
  const { isSignedIn } = useSelector((state) => state.auth);

  return (
    <NavigationContainer>
      {isSignedIn ? <ShopNavigator /> : <AuthNavigator />}
      <StatusBar style="light" />
    </NavigationContainer>
  );
};

export default MainNavigator;
