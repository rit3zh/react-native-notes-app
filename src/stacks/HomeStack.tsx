import { View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CreateNote, HomeScreen, Notes } from "@/screens/index";
import { DrawerToggleButton } from "@react-navigation/drawer";

const { Navigator, Screen } = createNativeStackNavigator();
export const HomeStack = () => {
  return (
    <Navigator>
      <Screen
        name="HomeScreen"
        component={HomeScreen as any}
        options={{
          headerLargeTitle: true,
          title: "Notes",
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

      <Screen
        name="add-note"
        component={CreateNote as any}
        options={{
          presentation: "formSheet",
          title: "Create Note",
          headerLargeTitle: true,
          headerTransparent: true,
          sheetGrabberVisible: true,
          headerLargeStyle: {
            backgroundColor: "#1c1c1e",
          },
          headerLargeTitleShadowVisible: true,
          headerBlurEffect: "systemUltraThinMaterialDark",
          headerTintColor: "#fff",
        }}
      />
    </Navigator>
  );
};
