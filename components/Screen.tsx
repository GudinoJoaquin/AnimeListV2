import React from "react";
import {
  View,
  StyleSheet,
  StatusBar,
  Platform,
  ScrollView,
} from "react-native";
import { StatusBar as ExpoStatusBar } from "expo-status-bar";
import Nav from "./Nav";
import { Stack } from "expo-router/stack";
import { useRoute } from "@react-navigation/native";

// Componente Screen
const Screen = ({ children }: { children: React.ReactNode }) => {
  const route = useRoute();
  const statusBarHeight = Platform.OS === "ios" ? 20 : StatusBar.currentHeight; // Ajuste dinámico según plataforma
  const formattedHeaderTitle = route.name.split("/")[0];

  // Capitalizar la primera letra
  const headerTitle =
    formattedHeaderTitle.charAt(0).toUpperCase() +
    formattedHeaderTitle.slice(1);

  return (
    <View
      style={[
        styles.container,
         { paddingTop: statusBarHeight },
      ]}
    >
      <ExpoStatusBar style="dark" />
      {/* <Stack.Screen
        options={{
          headerStyle: {
            backgroundColor: "white",
          },
          headerShadowVisible: false,
          headerShown: route.name != "index" && true,
          headerTitle: headerTitle,
          headerLeft: () => "",
        }}
      /> */}
      {children}
    </View>
  );
};

// Estilos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff", // O el color que desees para el fondo
  },
});

export default Screen;
