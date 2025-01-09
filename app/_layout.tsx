import React from "react";
import "../global.css";
import { View } from "react-native";
import { Slot, Stack, Tabs } from "expo-router";

export default function RootLayout() {
  return <Stack screenOptions={{ headerShown: false }} />;
}
