import {
  Image,
  FlatList,
  Text,
  View,
  Pressable,
} from "react-native";
import { AnimeProps } from "@/utils/interfaces";
import { RecomendedSkeleton } from "./Loading"; // Importar el skeleton
import { Link } from "expo-router";
import useRecomendedAnimes from "@/hooks/useRecomendedAnimes";
import RecomendedCard from "./RecomendedCard";

export default function Recomended() {
  const { animes, loading, error } = useRecomendedAnimes();

  // Si no hay animes o hay un error
  if (error) return <Text>Error al cargar animes</Text>;

  // Si está cargando, mostrar el skeleton
  if (loading) {
    return (
      <FlatList
        data={[1, 2, 3, 4, 5]} // Solo para simular la carga de 5 items
        renderItem={() => <RecomendedSkeleton />} // Mostrar el skeleton en cada item
        keyExtractor={(item, index) => `skeleton-${index}`} // Clave única para cada skeleton
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    );
  }

  return (
    <FlatList
      data={animes}
      renderItem={({ item }: { item: AnimeProps }) => (
        <View className="flex-row">
          {item.entry.map((entry: AnimeProps, index) => (
            <RecomendedCard anime={entry} key={index}/>
          ))}
        </View>
      )}
      keyExtractor={(item, index) => `anime-${index}`} // Clave única para cada elemento
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
