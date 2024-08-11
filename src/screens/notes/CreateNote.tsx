import {
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect, useRef, useState } from "react";
import {
  List,
  Section,
  useBinding,
  ColorPicker,
  Text,
  HStack,
  Spacer,
  Image,
  Button,
} from "swiftui-react-native";
import { symbols } from "@/constants/Symbols";
import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { addNote, createTable, fetchNotes } from "@/db/Flow";
import { Notes } from "@/typings/Notes";
import { generateRandomId } from "@/utils/randomIdGenerator";
import {
  alert,
  toast,
  dismissAlert,
  AlertOptions,
  ToastOptions,
} from "@baronha/ting";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";

export const CreateNote: React.FC<NativeStackHeaderProps> = (
  props: NativeStackHeaderProps
): React.ReactNode => {
  const text = useBinding("");
  const color = useBinding("#fff");
  const [iconColor, setIconColor] = useState<string>("#fff");
  const iconName = useBinding("chevron.forward");
  const sheet = useRef<TrueSheet>(null);
  const onPress = () => sheet.current?.present();
  const onIconPress = (name: string) => {
    iconName.setValue(name);
    return sheet.current?.dismiss();
  };

  useLayoutEffect(() => {
    createTable();
  }, []);

  const onSaveNote = async () => {
    if (!text?.value) {
      toast({
        title: "No title!",
        message: "You must specify a title for your note!",
        preset: "error",
      });
    } else {
      const note: Notes = {
        color: color?.value.replace("FF", ""),
        content: "",
        createdAt: new Date().toString(),
        iconName: iconName.value,
        title: text.value,
        id: generateRandomId(),
      };
      addNote(
        note,
        () => {
          alert({
            preset: "done",
            title: "Note Created",
            message: `Your note ${text?.value} has been created!`,
          });
          props.navigation.goBack();
        },
        (errr) => {
          console.log(errr);
          alert({
            preset: "error",
            title: "Unable to create note",
            message: `Unable to create note`,
          });
        }
      );
    }
  };
  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1, backgroundColor: "#1c1c1e" }}
      contentInsetAdjustmentBehavior="automatic"
    >
      <SafeAreaView className="flex-1 bg-[#1c1c1e]">
        <List
          scrollDisabled={true}
          resizable={true}
          autocorrectionDisabled={true}
        >
          <Section header="Specify your note name" resizable={true}>
            <TextInput
              placeholder="Name"
              className="text-white"
              cursorColor={"white"}
              value={text.value}
              onChangeText={(newText) => text.setValue(newText)}
              selectionColor={"white"}
            />
          </Section>
          <Section header="Select a color">
            <HStack>
              <ColorPicker
                selection={color}
                onChange={(newColor) => color.setValue(newColor)}
              />
              <Text style={{ marginLeft: 10 }}>{color.value}</Text>
              <Spacer />
            </HStack>
          </Section>

          <Section header="Select a icon - (optional)">
            <TouchableOpacity onPress={onPress}>
              <HStack>
                <Image systemName="bell.fill" fontSize={20} />
                <Text>{iconName.value}</Text>
                <Spacer />
                <TouchableOpacity onPress={onPress}>
                  <Image systemName={"chevron.forward"} />
                </TouchableOpacity>
              </HStack>
            </TouchableOpacity>
          </Section>

          <Button action={onSaveNote}>
            <Text foregroundStyle={"white"}>Save</Text>
          </Button>
        </List>
      </SafeAreaView>
      <TrueSheet
        ref={sheet}
        sizes={["medium"]}
        cornerRadius={24}
        backgroundColor={"#1c1c1e"}
      >
        <List>
          <Section header="Choose a icon">
            {symbols.map((s, i) => (
              <TouchableOpacity onPress={() => onIconPress(s.icon)}>
                <HStack key={i.toString()}>
                  <Image systemName={s.icon as any} fontSize={20} />
                  <Text>{s.name}</Text>
                  <Spacer />
                </HStack>
              </TouchableOpacity>
            ))}
          </Section>
        </List>
      </TrueSheet>
    </ScrollView>
  );
};
