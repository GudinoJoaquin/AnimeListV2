import React from "react";
import { Text, ScrollView, View } from "react-native";
import AnimeList from "@/components/AnimeList";
import Recomended from "@/components/Recomended";
import useGenres from "@/hooks/useGenres";
import SearchInput from "@/components/SearchInput"; // Componente de entrada
import useSearch from "@/hooks/useSearch"; // Custom hook para la lógica
import Nav from "@/components/Nav";

export default function Index() {
  const { genres } = useGenres("https://api.jikan.moe/v4/genres/anime");
  const { searchQuery, setSearchQuery, debouncedQuery, isKeyboardVisible } =
    useSearch(); // Usamos el hook

  const searchUrl =
    debouncedQuery.length > 2
      ? `https://api.jikan.moe/v4/anime?q=${debouncedQuery}&`
      : "https://api.jikan.moe/v4/anime?";

  if (!genres) return <Text>No hay géneros disponibles</Text>;

  return (
    <View>
      {/* Usar SearchInput con el hook */}
      <ScrollView>
        <SearchInput value={searchQuery} onChangeText={setSearchQuery} />

        {debouncedQuery.length === 0 && (
          <View>
            <Text className="font-bold text-3xl px-[10px] py-[15px]">
              Recomendaciones
            </Text>
            <View className="items-center pb-[20px]">
              <Recomended />
            </View>
          </View>
        )}

        <View className="items-center py-[20px]">
          <AnimeList searchQuery={searchUrl} />
        </View>
      </ScrollView>

      {!isKeyboardVisible && <Nav />}
    </View>
  );
}