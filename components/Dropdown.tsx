import React, { useState } from "react";
import { StyleSheet, View, Text } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import AntDesign from "@expo/vector-icons/AntDesign";


interface DropdownProps {
  data: DataProps[]
  placeholder: string
}

interface DataProps {
  label: string
  value: string | number
}

export default function DropdownComponent({ data, placeholder }: DropdownProps) {
  const [value, setValue] = useState(null);

  const renderItem = (item: DataProps) => {
    return (
      <View>
        <Text style={styles.textItem}>{item.label}</Text>
      </View>
    );
  };

  return (
    <Dropdown
      style={styles.dropdown}
      placeholderStyle={styles.placeholderStyle}
      selectedTextStyle={styles.selectedTextStyle}
      data={data}
      maxHeight={300}
      labelField="label"
      valueField="value"
      placeholder={placeholder}
      value={value}
      onChange={(item) => {
        setValue(item.value);
      }}
      renderItem={renderItem}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    width: 90,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  textItem: {
    flex: 1,
    fontSize: 14,
    width: 100,
    paddingHorizontal: 5,
    paddingVertical: 10,
  },
  placeholderStyle: {
    fontSize: 12,
  },
  selectedTextStyle: {
    fontSize: 12,
  },
});
