import { View, Text, SafeAreaView, ScrollView, TextInput } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { useFonts } from "expo-font";
import { type Notes as NoteType } from "@/typings/Notes";
import { formatDate } from "@/utils/formatDate";
import { updateNoteContent, updateNoteCreatedAt } from "@/db/Flow";

export const Notes = (props: NativeStackHeaderProps) => {
  const [fontLoaded] = useFonts({
    HeadingFont: require("@/assets/Sarabun-font/Sarabun-SemiBold.ttf"),
  });

  const params = props?.route?.params as NoteType;
  const [value, setValue] = useState<string>(params?.content);

  const onChangeText = (text: string) => setValue(text);
  useLayoutEffect(() => {
    props.navigation.addListener("blur", () => {
      updateNoteContent(
        params.id as number,
        value,
        () => console.log("Updated Content"),
        () => console.log("Error updating")
      );

      updateNoteCreatedAt(
        params.id as number,
        new Date().toString(),
        () => {},
        (e) => console.log("Unable to update createdAt", e)
      );
    });
    return () => {
      props.navigation.removeListener("blur", () => true);
    };
  });
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SafeAreaView>
        <View className="ml-4 mt-4">
          <Text
            className="text-white text-3xl"
            style={{
              fontFamily: fontLoaded ? "HeadingFont" : undefined,
            }}
          >
            {params?.title}
          </Text>
          <View className="mt-1">
            <Text className="text-[#818181] text-[15px]">
              {formatDate(new Date(params.createdAt))}
            </Text>
          </View>
        </View>

        <View className="ml-4 mt-5">
          <TextInput
            value={value}
            cursorColor={"white"}
            placeholder="Start your note..."
            placeholderTextColor={"#959595"}
            selectionColor={"white"}
            className="text-[#d7d6d6] text-xl max-w-[400px]"
            multiline={true}
            onChangeText={onChangeText}
          />
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};
