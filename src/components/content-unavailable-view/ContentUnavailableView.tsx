import React from "react";
import { View, Text } from "react-native";

interface ContentUnavailableViewProps {
  title: string;
  renderIcon: () => React.ReactNode;
  description: string;
}

export const ContentUnavailableView: React.FC<ContentUnavailableViewProps> = ({
  title,
  renderIcon,
  description,
}: ContentUnavailableViewProps) => {
  return (
    <View className="justify-center items-center p-4">
      <View className="mb-4">{renderIcon()}</View>
      <Text
        numberOfLines={1}
        className="text-lg font-bold text-white max-w-[290px]"
      >
        {title}
      </Text>
      <Text className="text-base text-[#949393] text-center mt-2">
        {description}
      </Text>
    </View>
  );
};
