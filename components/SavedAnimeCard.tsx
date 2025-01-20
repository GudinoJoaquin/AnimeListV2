import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import Score from "./Score";
import { Link } from "expo-router";
import { AnimeProps, AnimesDataProps } from "@/utils/interfaces";

export default function SavedAnimeCard({
  anime,
}: {
  anime: AnimeProps & AnimesDataProps;
}) {
  const {
    mal_id,
    images,
    title,
    title_english,
    title_japanese,
    title_synonyms,
    episodes,
    genres,
    type,
    saved_at,
    anime_score,
    anime_episodes_watched,
    anime_status,
    season,
    aired,
    status,
  } = anime;

  let truncatedJapaneseTitle;
  if (title_japanese) {
    truncatedJapaneseTitle =
      title_japanese.length > 13
        ? title_japanese.slice(0, 13) + "..."
        : title_japanese;
  }

  if (!anime_episodes_watched) return;

  const truncatedTitle =
    title.length > 13 ? title.slice(0, 20) + "" : title;

  const date = new Date(saved_at);

  const formattedDate = date
    .toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    })
    .split("/")
    .join("-");

  return (
    <Link href={`/${mal_id}`} asChild>
      <Pressable>
        <View className="flex-row bg-[#ececec] rounded-lg mb-5 shadow-lg p-4 w-[370px] h-[200px]">
          <Image
            className="w-[100px] h-full rounded-lg mr-4"
            source={{ uri: images.jpg.large_image_url }}
          />
          <View className="flex-1 justify-between">
            {/* Título y Score */}
            <View className="mb-1">
              <View className="flex-row justify-between items-center">
                <View className="max-w-[75%]">
                  <Text className="text-lg font-bold">{truncatedTitle}</Text>
                </View>
                <Score score={anime_score} />
              </View>
              <Text className="text-sm text-[#555] mt-[-10px] mb-[10px]">
                {truncatedJapaneseTitle}
              </Text>
            </View>

            {/* Saved y season */}
            {/* <View>
              <View className="flex-row justify-between">
                <Text>{`${type}, ${season ? season : ""}, ${
                  aired?.prop?.from?.year
                }`}</Text>
                <Text>{status === "Currently Airing" && "Airing"}</Text>
              </View>
              <Text>Saved: {formattedDate}</Text>
            </View> */}

            {/* ProgressBar */}
            {/* <View>
              <View className="bg-gray-300 w-[230px] h-[20px] rounded-[5px]">
                <View
                  style={{
                    width: `${Math.min(
                      (anime_episodes_watched / episodes) * 100,
                      100
                    )}%`, 
                  }}
                  className={`${
                    anime_status === "completed"
                      ? "bg-blue-500"
                      : anime_status === "watching"
                      ? "bg-green-600"
                      : "bg-gray-400"
                  } h-full rounded-[5px]`}
                />
              </View>
              <View className="items-end">
                <Text className="mt-1 text-sm text-gray-600">
                  {anime_episodes_watched}/{episodes} ep
                </Text>
              </View>
            </View> */}

          </View>
        </View>
      </Pressable>
    </Link>
  );
}
