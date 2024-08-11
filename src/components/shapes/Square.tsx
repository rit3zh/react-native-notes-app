import { View, Text } from "react-native";
import React from "react";
import { FontAwesome5 } from "@expo/vector-icons";

interface IProps {
  height: number;
  width: number;
  renderIcon?: () => JSX.Element & React.ReactNode;
  bgColor?: string;
}

export const Square: React.FC<IProps> = ({
  height,
  width,
  renderIcon,
  bgColor,
}: IProps): React.ReactNode & React.JSX.Element => {
  return (
    <View
      className="rounded-[40px] items-center justify-center"
      style={{
        width,
        height,
        backgroundColor: bgColor,
      }}
    >
      {renderIcon!()}
    </View>
  );
};
