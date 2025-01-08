import React from "react";
import { Stack, Slot } from "expo-router";
import "../global.css";
import { View } from "react-native";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="explore"/>
      <Stack.Screen name="season"/>
      <Stack.Screen name="list"/>
      <Stack.Screen name="account"/>
    </Stack>
  );
}
