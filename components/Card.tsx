import React from "react";
import { Text, View, Image, Pressable } from "react-native";
import Score from "./Score";
import { Link } from "expo-router";
import { AnimeProps } from "@/utils/interfaces";

export default function Card({ anime }: { anime: AnimeProps }) {
  const {
    mal_id,
    images,
    title,
    title_english,
    title_japanese,
    episodes,
    score,
    synopsis,
    genres,
    type,
    duration,
  } = anime;

  const displayedGenres = genres.slice(0, 2);
  const truncatedJapaneseTitle =
    title_japanese.length > 13
      ? title_japanese.slice(0, 13) + "..."
      : title_japanese;

  const truncatedTitle =
    title.length > 13
      ? title.slice(0, 40) + ""
      : title;
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
                <View className="flex-col max-w-[75%]">
                  {title_english ? (
                    <Text className="text-lg font-bold leading-tight">{truncatedTitle}</Text>
                  ) : (
                    <Text className="text-lg font-bold leading-tight">{truncatedTitle}</Text>
                  )}
                </View>
                <Score score={score} />
              </View>
              <Text className="text-sm text-[#555]">
                {truncatedJapaneseTitle}
              </Text>
            </View>

            {/* Géneros */}
            <View className="flex-row flex-wrap mb-1">
              {displayedGenres.map((genre) => (
                <Text
                  key={genre.name}
                  className="bg-[#E0E0E0] px-2 py-1 rounded-lg mr-2 text-xs text-[#333]"
                >
                  {genre.name}
                </Text>
              ))}
            </View>

            {/* Subtítulo y Descripción */}
            <View className="mb-2">
              {type.toLowerCase() !== "movie" ? (
                <Text className="text-sm text-[#555]">{episodes} Episodes</Text>
              ) : (
                <Text className="text-sm text-[#555]">{duration}</Text>
              )}
            </View>
            <Text className="text-sm text-[#555] leading-5" numberOfLines={2}>
              {synopsis}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
}
