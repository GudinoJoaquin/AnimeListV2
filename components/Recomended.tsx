import {
  Image,
  FlatList,
  Text,
  View,
  Pressable,
} from "react-native";
import { getAnimes } from "@/hooks/useAnimes";
import { AnimeProps } from "@/utils/interfaces";
import { RecomendedSkeleton } from "./Loading"; // Importar el skeleton
import { Link } from "expo-router";

export default function Recomended() {
  const { animes, loading, error } = getAnimes(
    "https://api.jikan.moe/v4/recommendations/anime"
  );

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
          {item.entry.map((entry: AnimeProps) => (
            <Link key={entry.mal_id} href={`/${entry.mal_id}`} asChild>
              <Pressable>
                <View
                  className="relative w-[152] h-[217] mx-[10px]"
                >
                  <Image
                    className="w-full h-full object-cover rounded-[10px]"
                    source={{
                      uri: entry.images.jpg.large_image_url,
                    }}
                  />
                  <View className="absolute inset-0 bg-black opacity-40 rounded-[10px]" />
                  <Text className="absolute bottom-2 left-2 text-white font-bold text-lg">
                    {entry.title}
                  </Text>
                </View>
              </Pressable>
            </Link>
          ))}
        </View>
      )}
      keyExtractor={(item, index) => `anime-${index}`} // Clave única para cada elemento
      horizontal
      showsHorizontalScrollIndicator={false}
    />
  );
}
