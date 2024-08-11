import {
  SafeAreaView,
  Text,
  View,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { Square } from "@/components";
import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFonts } from "expo-font";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export const LandingScreen: React.FC<NativeStackHeaderProps> = (
  props: NativeStackHeaderProps
): React.ReactNode & React.JSX.Element => {
  const [fontLoaded] = useFonts({
    HeadingFont: require("@/assets/Sarabun-font/Sarabun-SemiBold.ttf"),
  });

  return (
    <SafeAreaView className="flex-1">
      <View className="items-center justify-center flex-row mt-10 ml-8">
        <Square
          height={200}
          width={200}
          bgColor="#8b2ef5"
          renderIcon={() => (
            <>
              <FontAwesome5 name="paint-roller" size={90} color="#f2eded" />
            </>
          )}
        />
        <View className="overflow-hidden right-[50px] top-[100px]">
          <Square
            height={200}
            width={200}
            bgColor="#e72fa6"
            renderIcon={() => (
              <>
                <MaterialCommunityIcons name="draw" size={90} color="#f2eded" />
              </>
            )}
          />
        </View>
      </View>

      <View className="justify-center flex-1 items-center flex-col">
        <Text
          className="text-white text-5xl ml-5"
          style={{
            fontFamily: fontLoaded ? "HeadingFont" : undefined,
          }}
          numberOfLines={2}
        >
          All of your notes, at a single place
        </Text>
        <View className="ml-3 mt-3">
          <Text className="text-[#8a8989] text-[15px]" numberOfLines={2}>
            All your notes in one place. Easily organize, search, and access
            your ideas and tasks whenever you need them.
          </Text>
        </View>
      </View>
      <TouchableWithoutFeedback
        onPress={() => props.navigation.navigate("AppStack")}
      >
        <View className="items-center justify-center bottom-[80px]">
          <View className="h-[60px] w-80 rounded-xl bg-white items-center justify-center">
            <Text
              className="text-black text-[18px] font-bold"
              style={{
                fontFamily: fontLoaded ? "HeadingFont" : undefined,
              }}
            >
              Get Started
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
};
