// components/SearchInput.tsx

import React, { useState } from "react";
import { View, TextInput, Pressable } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

interface SearchInputProps {
  value: string;
  onChangeText: (text: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ value, onChangeText }) => {
  return (
    <View className="px-[10px] py-[15px] flex-row items-center">
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
};

export default SearchInput;
