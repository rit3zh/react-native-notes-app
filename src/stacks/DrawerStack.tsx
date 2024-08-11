import { createDrawerNavigator } from "@react-navigation/drawer";
import { HomeStack } from "./HomeStack";
import { DrawerView } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { FavoriteStack } from "./FavoriteStack";
const { Screen, Navigator } = createDrawerNavigator();

export const DrawerStack = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#00000000",
        drawerLabelStyle: {
          color: "white",
        },
      }}
      drawerContent={(props) => <DrawerView {...props} />}
    >
      <Screen
        name="HomeStack"
        component={HomeStack}
        options={{
          title: "Home",
          drawerIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "home" : "home-outline"}
              size={22}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
      <Screen
        name="FavoriteStack"
        component={FavoriteStack}
        options={{
          title: "Favorites",
          drawerIcon: ({ color, focused }) => (
            <Ionicons
              name={focused ? "bookmarks" : "bookmarks-outline"}
              size={22}
              color={focused ? "white" : "gray"}
            />
          ),
        }}
      />
    </Navigator>
  );
};
