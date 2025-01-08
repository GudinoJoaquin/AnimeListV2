import {
  ScrollView,
  Text,
  View,
  Pressable,
} from "react-native";
import Card from "./Card";
import { getAnimes } from "@/hooks/useAnimes";
import { AnimeProps } from "@/utils/interfaces";
import { useState } from "react";
import { AnimeListCardSkeleton } from "./Loading";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function AnimeList({ searchQuery }: { searchQuery: string }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { animes, pagination, loading } = getAnimes(
    `${searchQuery}page=${currentPage}`
  );

  if (loading) {
    return (
      <ScrollView>
        {/* Mostrar Skeleton solo si loading es verdadero */}
        {[...Array(10)].map((_, index) => (
          <AnimeListCardSkeleton key={index} />
        ))}
      </ScrollView>
    );
  }

  if (!animes || animes.length === 0) {
    return (
      <View className="items-center mt-[20px]">
        <Text className="text-lg">No se encontraron animes</Text>
      </View>
    );
  }
  if (!pagination) return <Text>No hay paginacion</Text>;

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <ScrollView>
      {animes.map((anime: AnimeProps) => (
        <Card key={anime.mal_id} anime={anime} />
      ))}
      <View className="flex-row items-center justify-center gap-[10px] mb-[100px]">
        <Pressable
          onPress={handlePreviousPage}
          className="bg-[#e4e4e4] p-[5px] rounded-lg"
        >
          <MaterialIcons name="arrow-back-ios-new" size={30} color={currentPage == 1 ? '#b8b8b8' : 'black'} />
        </Pressable>

        <Text className="p-[5px] rounded-md text-xl font-bold ">
          {currentPage}
        </Text>

        <Pressable
          onPress={handleNextPage}
          className="bg-[#e4e4e4] p-[5px] rounded-lg"
        >
          <MaterialIcons name="arrow-forward-ios" size={30} color={pagination.has_next_page ? 'black' : '#b8b8b8'} />
        </Pressable>
      </View>
    </ScrollView>
  );
}
