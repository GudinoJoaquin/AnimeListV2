// components/SearchInput.tsx

import React from "react";
import { View, TextInput, Pressable, Text } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useNavigation } from "@react-navigation/native";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}
export default function SearchInput({ value, onChangeText }: SearchInputProps) {
  const navigation = useNavigation();

  return (
    <View className="px-[10px] py-[15px] flex-row items-center">
      <Pressable className="mr-[20px]" onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={24} color="black" />
      </Pressable>
      <TextInput
        value={value}
        onChangeText={onChangeText}
        placeholder="Buscar anime..."
        style={{
          flex: 1,
          borderBottomWidth: 1,
          borderColor: "#ccc",
          paddingVertical: 5,
          fontSize: 16,
        }}
      />
      {value.length > 0 && (
        <Pressable onPress={() => onChangeText("")}>
          <FontAwesome name="times" size={24} color="#ccc" />
        </Pressable>
      )}
    </View>
  );
}
