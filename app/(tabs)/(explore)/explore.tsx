import React from "react";
import { Text, ScrollView, View } from "react-native";
import AnimeList from "@/components/AnimeList";
import Recomended from "@/components/Recomended";
import useGenres from "@/hooks/useGenres";
import SearchInput from "@/components/SearchInput"; // Componente de entrada
import useSearch from "@/hooks/useSearch"; // Custom hook para la lógica
import Nav from "@/components/Nav";
import Screen from "@/components/Screen";
import ExploreList from "@/components/ExploreList";

export default function Explore() {
  const { genres } = useGenres();
  const { searchQuery, setSearchQuery, debouncedQuery, isKeyboardVisible } =
    useSearch(); // Usamos el hook

  const searchUrl =
    debouncedQuery.length > 2
      ? `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&`
      : "https://api.jikan.moe/v4/anime?";

  if (!genres) return <Text>No hay géneros disponibles</Text>;

  return (
    <Screen header>
      {/* Usar SearchInput con el hook */}
      <ScrollView>
        <SearchInput value={searchQuery} onChangeText={setSearchQuery} />

        <View className="items-center py-[20px]">
          <ExploreList searchQuery={searchUrl} />
        </View>
      </ScrollView>
    </Screen>
  );
}
