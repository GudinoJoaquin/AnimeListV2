import { ScrollView, Text, View, Pressable } from "react-native";
import useAnimes from "@/hooks/useAnimes";
import { AnimeProps } from "@/utils/interfaces";
import { useState } from "react";
import { AnimeListCardSkeleton } from "./Loading";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import RecomendedCard from "./RecomendedCard";

export default function ExploreList({ searchQuery }: { searchQuery: string }) {
  const [currentPage, setCurrentPage] = useState(1);

  const { animes, pagination, loading } = useAnimes(
    `${searchQuery}page=${currentPage}`,
    "popularity",
    "asc"
  );

  if (loading) {
    return (
      <ScrollView>
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

  if (!pagination) return <Text>No hay paginación</Text>;

  const handleNextPage = () => {
    if (pagination.has_next_page) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Agrupar animes en filas de 2 elementos
  const animeRows: AnimeProps[][] = [];
  for (let i = 0; i < animes.length; i += 2) {
    animeRows.push(animes.slice(i, i + 2));
  }

  return (
    <ScrollView>
      {animeRows.map((row, rowIndex) => (
        <View
          key={rowIndex}
          className="flex-row justify-center items-center my-2"
        >
          {row.map((anime, index) => (
            <RecomendedCard anime={anime} key={index} />
          ))}
        </View>
      ))}

      <View className="flex-row items-center justify-center gap-[10px] mb-[100px]">
        <Pressable
          onPress={handlePreviousPage}
          className="bg-[#e4e4e4] p-[5px] rounded-lg"
        >
          <MaterialIcons
            name="arrow-back-ios-new"
            size={30}
            color={currentPage == 1 ? "#b8b8b8" : "black"}
          />
        </Pressable>

        <Text className="p-[5px] rounded-md text-xl font-bold ">
          {currentPage}
        </Text>

        <Pressable
          onPress={handleNextPage}
          className="bg-[#e4e4e4] p-[5px] rounded-lg"
        >
          <MaterialIcons
            name="arrow-forward-ios"
            size={30}
            color={pagination.has_next_page ? "black" : "#b8b8b8"}
          />
        </Pressable>
      </View>
    </ScrollView>
  );
}
