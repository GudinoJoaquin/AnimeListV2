import React from "react";
import { Text, ScrollView, View } from "react-native";
import AnimeList from "@/components/AnimeList";
import SearchInput from "@/components/SearchInput"; // Componente de entrada
import useSearch from "@/hooks/useSearch";
import Screen from "@/components/Screen";

export default function Explore() {
  const { searchQuery, setSearchQuery, debouncedQuery } = useSearch(); // Usamos el hook

  const searchUrl = `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&`;

  return (
    <Screen>
      {/* Usar SearchInput con el hook */}
      <SearchInput value={searchQuery} onChangeText={setSearchQuery} />
      <ScrollView>
        {searchQuery && (
          <View className="items-center py-[20px]">
            <AnimeList searchQuery={searchUrl} order="scored_by" sort="desc" />
          </View>
        )}
      </ScrollView>
    </Screen>
  );
}
