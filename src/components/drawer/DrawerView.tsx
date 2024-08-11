import { View, Text } from "react-native";
import React from "react";
import {
  type DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
export const DrawerView: React.FC<DrawerContentComponentProps> = ({
  ...props
}: DrawerContentComponentProps): React.ReactNode => {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
};
