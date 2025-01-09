import { Image, Text, View, StyleSheet, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Table, TableRow } from "../components/Tables";
import { Stack } from "expo-router/stack";
import Screen from "@/components/Screen";
import useAnimeById from "@/hooks/useAnimeById";

export default function Details() {
  const { mal_id } = useLocalSearchParams();
  const { anime } = useAnimeById(mal_id);

  if (!anime) return;

  const {
    images,
    title,
    title_english,
    title_japanese,
    episodes,
    score,
    synopsis,
    type,
    duration,
    status,
    aired,
    genres,
    season,
  } = anime;

  const releaseDate = aired?.prop?.from;
  const finishDate = aired?.prop?.to;

  return (
    <Screen>
      <ScrollView style={styles.container}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: title,
          }}
        />
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: images?.jpg?.image_url }}
          />
        </View>
        <Text style={styles.title}>{title || title_english}</Text>
        <Text style={styles.subtitle}>{title_japanese}</Text>
        <View className="items-center justify-center flex-row mx-[50px] flex-wrap gap-[5px]">
          {genres?.map((genre: { name: string; mal_id: number }) => (
            <View
              key={genre.mal_id}
              className="bg-slate-200 rounded-lg px-[5px] py-[2px]"
            >
              <Text className="text-xs">{genre.name}</Text>
            </View>
          )) || "Unknown"}
        </View>

        {/* Tabla */}
        <Table>
          <TableRow attribute="Score" value={score || "N/A"} />
          <TableRow attribute="Episodes" value={episodes || "Unknown"} />
          <TableRow attribute="Type" value={type || "Unknown"} />
          <TableRow attribute="Duration" value={duration || "Unknown"} />
          <TableRow attribute="Status" value={status || "Unknown"} />
          <TableRow
            attribute="First episode"
            value={
              `${releaseDate?.day}/${releaseDate?.month}/${releaseDate?.year}` ||
              "Unknown"
            }
          />
          {finishDate.day && (
            <TableRow
              attribute="Last episode"
              value={
                `${finishDate?.day}/${finishDate?.month}/${finishDate?.year}` ||
                "Unknown"
              }
            />
          )}
          {season && (
            <TableRow attribute="Season" value={season || "Unknown"} />
          )}
        </Table>

        <Text style={styles.description}>{synopsis}</Text>
      </ScrollView>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  image: {
    width: 200,
    height: 300,
    borderRadius: 10,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    textAlign: "center",
  },
  description: {
    fontSize: 16,
    color: "#555",
    marginTop: 20,
  },
});
