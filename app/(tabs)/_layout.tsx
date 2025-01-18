import React from "react";
import "@/global.css";
import { Link, Tabs } from "expo-router";
import {
  CalendarIcon,
  HomeIcon,
  ListIcon,
  SearchIcon,
  UserIcon,
} from "@/components/Icons";
import { Pressable } from "react-native";
import useSearch from "@/hooks/useSearch";

export default function TabsLayout() {
  const { isKeyboardVisible } = useSearch()
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          alignItems: "center",
          justifyContent: "center",
          position: "absolute",
          bottom: isKeyboardVisible ? -300 : 0,
          backgroundColor: "#ffffff", // Fondo sólido
          borderRadius: 16, // Bordes redondeados
          marginHorizontal: 16, // Margen lateral
          marginBottom: 20, // Margen inferior
          height: "auto", // Altura del tab bar
          shadowColor: "#000", // Color de sombra
          shadowOffset: { width: 0, height: 4 }, // Desplazamiento de sombra
          shadowOpacity: 0.1, // Opacidad de sombra
          shadowRadius: 8, // Radio de sombra
          elevation: 5, // Sombra para Android
        }, // Oculta las etiquetas predeterminadas
        headerShown: true,
        
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "AniList",
          tabBarIcon: ({ focused }) => (
            <HomeIcon size={24} color={focused ? "#3b82f6" : "#9ca3af"} />
          ),
          animation: "shift",
          headerShown: true,
          headerRight: () => (
            <Link href='../SearchScreen' asChild>
              <Pressable className="mr-[20px]">
                <SearchIcon size={24} color={"black"} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="(explore)/explore"
        options={{
          title: "Explore",
          tabBarIcon: ({ focused }) => (
            <SearchIcon size={24} color={focused ? "#3b82f6" : "#9ca3af"} />
          ),
          animation: "shift",
          headerShown: true,
          headerRight: () => (
            <Link href='../../SearchScreen' asChild>
              <Pressable className="mr-[20px]">
                <SearchIcon size={24} color={"black"} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="(season)/season"
        options={{
          title: "(Season)/season",
          tabBarIcon: ({ focused }) => (
            <CalendarIcon size={24} color={focused ? "#3b82f6" : "#9ca3af"} />
          ),
          animation: "shift",
          headerRight: () => (
            <Link href='../../SearchScreen' asChild>
              <Pressable className="mr-[20px]">
                <SearchIcon size={24} color={"black"} />
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="(list)/list"
        options={{
          title: "My list",
          tabBarIcon: ({ focused }) => (
            <ListIcon size={24} color={focused ? "#3b82f6" : "#9ca3af"} />
          ),
          animation: "shift",
          headerRight: () => ''
        }}
      />
      <Tabs.Screen
        name="(account)/account"
        options={{
          title: "Account",
          tabBarIcon: ({ focused }) => (
            <UserIcon size={24} color={focused ? "#3b82f6" : "#9ca3af"} />
          ),
          animation: "shift",
          headerShown: false
        }}
      />
    </Tabs>
  );
}
