import { DarkTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { LandingScreen } from "@/screens";
import { DrawerStack } from "@/stacks/DrawerStack";

const { Screen, Navigator } = createNativeStackNavigator();

export function NavigationFlow() {
  return (
    <NavigationContainer theme={DarkTheme}>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen name="LandingScreen" component={LandingScreen as any} />
        <Screen name="AppStack" component={DrawerStack} />
      </Navigator>
    </NavigationContainer>
  );
}
