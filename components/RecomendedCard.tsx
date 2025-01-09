import { AnimeProps } from "@/utils/interfaces";
import { Link } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";

export default function RecomendedCard({ anime }: { anime: AnimeProps }) {
  return (
    <Link key={anime.mal_id} href={`/${anime.mal_id}`} asChild>
      <Pressable>
        <View className="relative w-[172] h-[217] mx-[10px]">
          <Image
            className="w-full h-full object-cover rounded-[10px]"
            source={{
              uri: anime.images.jpg.large_image_url,
            }}
          />
          <View className="absolute inset-0 bg-black opacity-40 rounded-[10px]" />
          <Text className="absolute bottom-2 left-2 text-white font-bold text-lg">
            {anime.title}
          </Text>
        </View>
      </Pressable>
    </Link>
  );
}
