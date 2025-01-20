import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  Pressable,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import Screen from "@/components/Screen";
import { supabase } from "@/utils/supabase";
import { Link } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AnimeProps, AnimesDataProps } from "@/utils/interfaces";
import Score from "@/components/Score";

type RootStackParamList = {
  "(list)/list": { key: string } | undefined;
  "(other)/screen": undefined;
};

type AccountScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "(list)/list"
>;

export default function Account() {
  const [animeIds, setAnimeIds] = useState<AnimesDataProps[]>([]);
  const [animes, setAnimes] = useState<AnimeProps[]>([]);

  // Obtener animes de la base de datos al inicio
  useEffect(() => {
    const getAnimesData = async () => {
      const { data: dataSession } = await supabase.auth.getSession();
      const { session } = dataSession;
      if (session?.user?.id) {
        const { data: users_animes, error } = await supabase
          .from("users_animes")
          .select("*")
          .eq("user_id", session.user.id);
        if (error) {
          console.error("Error fetching anime IDs:", error);
        } else if (users_animes) {
          setAnimeIds(users_animes);
        }
      }
    };

    getAnimesData();
  }, []); // Ejecuta al montar

  // Obtener anime por ID desde la API externa
  const fetchAnimeById = async (id: number): Promise<AnimeProps | null> => {
    try {
      const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/`);
      const data = await response.json();
      return data.data;
    } catch (err) {
      console.error("Error fetching anime:", err);
      return null;
    }
  };

  // Actualizar los animes cada vez que se cambian los animeIds
  useEffect(() => {
    const fetchInitialAnimes = async () => {
      const fetchedAnimes = [];
      for (const id of animeIds) {
        const anime = await fetchAnimeById(id.anime_id);
        if (anime) {
          fetchedAnimes.push(anime);
        }
      }
      console.log("Fetched Animes:", fetchedAnimes);  // Verifica que los animes sean correctos
      setAnimes(fetchedAnimes);
    };

    if (animeIds.length > 0) {
      fetchInitialAnimes();
    }
  }, [animeIds]); // Dependemos de `animeIds` para actualizar los animes

  // Suscripción para escuchar cambios en la tabla `users_animes`
  useEffect(() => {
    const subscription = supabase
      .channel("users_animes")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "users_animes" },
        async (payload) => {
          console.log("Nuevo anime añadido:", payload);
          const newAnimeId = payload.new.anime_id;

          // Agregar el nuevo anime a `animeIds`
          setAnimeIds((prevAnimeIds) => {
            const updatedAnimeIds = [...prevAnimeIds, payload.new];
            console.log("Updated Anime IDs:", updatedAnimeIds); // Verificar los ids actualizados
            return updatedAnimeIds; // Actualizamos el estado con el nuevo anime ID
          });

          // También podemos agregar el nuevo anime directamente a la lista de `animes`
          const newAnime = await fetchAnimeById(newAnimeId);
          if (newAnime) {
            setAnimes((prevAnimes) => {
              const updatedAnimes = [...prevAnimes, newAnime];
              console.log("Updated Animes:", updatedAnimes); // Verificar los animes actualizados
              return updatedAnimes;
            });
          }
        }
      )
      .subscribe();

    return () => {
      subscription.unsubscribe(); // Limpiar la suscripción al desmontar
    };
  }, []); // Solo ejecuta una vez al montar

  const savedAnimes = animes.map((anime, index) => ({
    ...anime,
    ...animeIds[index],
  }));

  const formatDate = (saved_at: string) => {
    const date = new Date(saved_at);

    const formattedDate = date
      .toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .split("/")
      .join("-");

    return formattedDate;
  };

  return (
    <Screen>
      <View className="mb-[40px]">
        {animeIds.length === 0 ? (
          <Text>No tienes animes guardados.</Text>
        ) : animes.length === 0 ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : (
          <FlatList
            data={savedAnimes}
            keyExtractor={(item) => item.mal_id.toString()}
            renderItem={({ item }) => (
              <Link href={`/${item.mal_id}`} asChild>
                <Pressable>
                  <View className="flex-row bg-[#ececec] rounded-lg mb-5 shadow-lg p-4 w-[370px] h-[200px]">
                    <Image
                      className="w-[100px] h-full rounded-lg mr-4"
                      source={{ uri: item.images.jpg.large_image_url }}
                    />
                    <View className="flex-1 justify-between">
                      {/* Título y Score */}
                      <View className="mb-1">
                        <View className="flex-row justify-between items-center">
                          <View className="max-w-[75%]">
                            <Text className="text-lg font-bold text-clip overflow-hidden leading-tight">{item.title}</Text>
                          </View>
                          <Score score={item.anime_score} />
                        </View>
                        <Text className="text-sm text-[#555]  mb-[10px]">
                          {item.title_japanese}
                        </Text>
                      </View>

                      {/* Saved y season */}
                      <View>
                        <View className="flex-row justify-between">
                          <Text>{`${item.type}, ${item.season ? item.season : ""}, ${
                            item.aired?.prop?.from?.year
                          }`}</Text>
                          <Text>{item.status === "Currently Airing" && "Airing"}</Text>
                        </View>
                        <Text>Saved: {formatDate(item.saved_at)}</Text>
                      </View>

                      {/* ProgressBar */}
                      <View>
                        <View className="bg-gray-300 w-[230px] h-[20px] rounded-[5px]">
                          <View
                            style={{
                              width: `${Math.min(
                                (item.anime_episodes_watched / item.episodes) * 100,
                                100
                              )}%`, 
                            }}
                            className={`${
                              item.anime_status === "completed"
                                ? "bg-blue-500"
                                : item.anime_status === "watching"
                                ? "bg-green-600"
                                : "bg-gray-400"
                            } h-full rounded-[5px]`}
                          />
                        </View>
                        <View className="items-end">
                          <Text className="mt-1 text-sm text-gray-600">
                            {item.anime_episodes_watched}/{item.episodes} ep
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </Pressable>
              </Link>
            )}
          />
        )}
      </View>
    </Screen>
  );
}
