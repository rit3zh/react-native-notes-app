import { View, SafeAreaView, FlatList, ScrollView } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import ColorfulCard from "react-native-colorful-card";
import { FloatingAction } from "react-native-floating-action";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import { ContentUnavailableView } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import { Notes } from "@/typings/Notes";
import {
  fetchNotes,
  deleteNote,
  addNoteToFavorites,
  createFavoriteTable,
} from "@/db/Flow";
import { Image } from "swiftui-react-native";
import { formatDate } from "@/utils/formatDate";
import { ContextMenuView } from "react-native-ios-context-menu";
import { alert } from "@baronha/ting";
import Animated, {
  FadeInUp,
  FadeOut,
  FadeOutDown,
} from "react-native-reanimated";
import { truncateText } from "@/utils/truncate";

export const HomeScreen = (props: NativeStackHeaderProps) => {
  const [searchText, setSearchText] = useState<string>("");
  const [notes, setNotes] = useState<Notes[]>([]);

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => {
          const newText = event.nativeEvent.text;
          setSearchText(newText);
        },
        placeholder: "Search Notes...",
      },
    });
  }, [props.navigation]);

  const filteredData = notes.filter((item) =>
    item.title.toLowerCase().includes(searchText?.toLowerCase()!)
  );

  useLayoutEffect(() => {
    loadNotes();
    createFavoriteTable();

    const intervalId = setInterval(() => {
      loadNotes();
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  const loadNotes = () => {
    fetchNotes(
      (fetchedNotes) => setNotes(fetchedNotes),
      (error) => console.error(error)
    );
  };

  const FAVORITE_KEY: string = `key-01`;
  const DELETE_KEY: string = `key-02`;

  return (
    <React.Fragment>
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <SafeAreaView className="flex-1">
          {filteredData?.length !== 0 ? (
            <FlatList
              data={filteredData}
              scrollEnabled={false}
              numColumns={2}
              keyExtractor={({ title }) => title}
              renderItem={({ item, index }) => (
                <Animated.View
                  className="m-[10px]"
                  entering={FadeInUp.delay(index * 300)}
                  exiting={FadeOutDown}
                >
                  <ContextMenuView
                    menuConfig={{
                      menuTitle: "",

                      menuItems: [
                        {
                          actionKey: FAVORITE_KEY,
                          actionTitle: "Favorite",
                          icon: {
                            type: "IMAGE_SYSTEM",
                            imageValue: {
                              systemName: "star.fill",
                              hierarchicalColor: "#ffd250",
                            },
                          },
                        },
                        {
                          actionKey: DELETE_KEY,
                          actionTitle: "Delete",
                          menuAttributes: ["destructive"],
                          icon: {
                            type: "IMAGE_SYSTEM",
                            imageValue: {
                              systemName: "trash",
                            },
                          },
                        },
                      ],
                    }}
                    onPressMenuItem={(menu) => {
                      const action = menu?.nativeEvent.actionKey;
                      if (action === FAVORITE_KEY) {
                        addNoteToFavorites(
                          item.id as number,
                          () => {
                            alert({
                              title: "Favorited",
                              message: `Added note ${item.title} to favorites!`,
                            });
                          },
                          (e) => {
                            console.log(e);
                          }
                        );
                      } else if (action === DELETE_KEY) {
                        deleteNote(
                          item.id as number,
                          () => {
                            setNotes((prevNotes) =>
                              prevNotes.filter((note) => note.id !== item.id)
                            );
                            alert({
                              title: "Note Deleted",
                              message: `Your note ${item.title} has been deleted`,
                              preset: "done",
                            });
                          },
                          (error) => console.error(error)
                        );
                      }
                    }}
                  >
                    <ColorfulCard
                      title={truncateText(item.title, 20, true)}
                      value={
                        truncateText(item?.content, 20, true) || "No Content"
                      }
                      contentStyle={{
                        // ...item.contentStyle,
                        bottom: !item?.content ? 0 : 10,
                      }}
                      footerTextStyle={{
                        top: 8,
                        color: item.color === "#fff" ? "black" : "white",
                      }}
                      footerTitle={"Last Modified"}
                      footerValue={formatDate(new Date(item.createdAt))}
                      style={{
                        // ...item.style,
                        backgroundColor: item.color,
                      }}
                      ImageComponent={() => (
                        <Image
                          fontSize={22}
                          systemName={
                            item.iconName === "chevron.forward"
                              ? "note.text"
                              : (item.iconName as any)
                          }
                          foregroundStyle={
                            item.color === "#fff" ? "black" : "white"
                          }
                        />
                      )}
                      titleTextStyle={{
                        color: item.color === "#fff" ? "black" : "white",
                        maxWidth: 120,
                      }}
                      valueTextStyle={{
                        color: item.color === "#fff" ? "black" : "white",
                      }}
                      onPress={() =>
                        props.navigation.navigate("NoteScreen", {
                          ...item,
                        })
                      }
                    />
                  </ContextMenuView>
                </Animated.View>
              )}
            />
          ) : !notes?.length ? (
            <>
              <View className="justify-center items-center mt-40">
                <ContentUnavailableView
                  title={`No Notes`}
                  renderIcon={() => (
                    <Ionicons name="list" size={48} color="gray" />
                  )}
                  description="You haven't created any notes yet."
                />
              </View>
            </>
          ) : (
            <View className="justify-center items-center mt-40">
              <ContentUnavailableView
                title={`No results for "${searchText}"`}
                renderIcon={() => (
                  <Ionicons name="search" size={48} color="gray" />
                )}
                description="The content you're looking for is not available at the moment. Please check back later."
              />
            </View>
          )}
        </SafeAreaView>
      </ScrollView>
      <FloatingAction
        position="center"
        color="#7954ff"
        animated={true}
        listenKeyboard={true}
        overlayColor="transparent"
        buttonSize={65}
        onPressMain={() => props.navigation.navigate("add-note")}
        floatingIcon={<Ionicons name="add-sharp" color={"white"} size={26} />}
      />
    </React.Fragment>
  );
};
