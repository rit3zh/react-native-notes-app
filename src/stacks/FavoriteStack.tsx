import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { FavoriteScreen, Notes } from "@/screens/index";
import { DrawerToggleButton } from "@react-navigation/drawer";

const { Navigator, Screen } = createNativeStackNavigator();

export const FavoriteStack: React.FC = (): React.ReactNode => {
  return (
    <Navigator>
      <Screen
        name="FavoriteScreen"
        component={FavoriteScreen as any}
        options={{
          headerLargeTitle: true,
          title: "Favorite",
          headerTransparent: true,
          headerLargeStyle: {
            backgroundColor: "black",
          },
          headerLargeTitleShadowVisible: true,
          headerBlurEffect: "systemUltraThinMaterialDark",
          headerTintColor: "#fff",
          headerLeft: () => (
            <View className="right-3">
              <DrawerToggleButton tintColor="white" />
            </View>
          ),
        }}
      />

      <Screen
        name="NoteScreen"
        component={Notes as any}
        options={({ route }: any) => ({
          headerLargeTitle: false,
          title: route.params?.title as any,
          headerTransparent: true,
          headerLargeStyle: {
            backgroundColor: "black",
          },

          headerLargeTitleShadowVisible: true,
          headerBlurEffect: "systemUltraThinMaterialDark",
          headerTintColor: "#fff",
        })}
      />
    </Navigator>
  );
};
