import { View, Text, ScrollView, SafeAreaView, FlatList } from "react-native";
import React, { useLayoutEffect, useState } from "react";
import { NativeStackHeaderProps } from "@react-navigation/native-stack";
import type { Notes } from "@/typings/Notes";
import {
  deleteNote,
  fetchFavoriteNotes,
  removeNoteFromFavorites,
} from "@/db/Flow";
import ColorfulCard from "react-native-colorful-card";
import { Image } from "swiftui-react-native";
import { formatDate } from "@/utils/formatDate";
import { ContentUnavailableView } from "@/components";
import { Ionicons } from "@expo/vector-icons";
import Animated, { FadeInUp, FadeOutDown } from "react-native-reanimated";
import { ContextMenuView } from "react-native-ios-context-menu";
import { truncateText } from "@/utils/truncate";

export const FavoriteScreen: React.FC<NativeStackHeaderProps> = (
  props: NativeStackHeaderProps
) => {
  const [searchText, setSearchText] = useState<string>("");
  const [notes, setNotes] = useState<Notes[]>([]);

  const filteredData = notes.filter((item) =>
    item.title.toLowerCase().includes(searchText?.toLowerCase()!)
  );

  useLayoutEffect(() => {
    loadNotes();
    const intervalId = setInterval(() => {
      loadNotes();
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const loadNotes = () => {
    fetchFavoriteNotes(
      (fetchedNotes) => setNotes(fetchedNotes),
      (error) => console.error(error)
    );
  };

  useLayoutEffect(() => {
    props.navigation.setOptions({
      headerSearchBarOptions: {
        onChangeText: (event) => {
          const newText = event.nativeEvent.text;
          setSearchText(newText);
        },
        placeholder: "Search favorites...",
      },
    });
  }, [props.navigation]);

  const UNFAVORITE_KEY: string = `key-01`;
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
                    onPressMenuItem={(menu) => {
                      const action = menu?.nativeEvent.actionKey;
                      if (action === UNFAVORITE_KEY) {
                        removeNoteFromFavorites(
                          item.id as number,
                          () => {
                            alert({
                              title: "Favorited",
                              message: `Added note ${item.title} to favorites!`,
                            });
                            setNotes((prevNotes) =>
                              prevNotes.filter((note) => note.id !== item.id)
                            );
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
                    menuConfig={{
                      menuTitle: "",

                      menuItems: [
                        {
                          actionKey: UNFAVORITE_KEY,
                          actionTitle: "Unfavorite",
                          icon: {
                            type: "IMAGE_SYSTEM",
                            imageValue: {
                              systemName: "star.slash.fill",
                              hierarchicalColor: "#ffe084",
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
                  title={`No Favorites`}
                  renderIcon={() => (
                    <Ionicons name="bookmark" size={48} color="gray" />
                  )}
                  description="Currently, you do not added any notes in your favorite list."
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
    </React.Fragment>
  );
};
