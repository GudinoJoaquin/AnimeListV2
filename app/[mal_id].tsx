import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  Alert,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Table, TableRow } from "../components/Tables";
import { Stack } from "expo-router/stack";
import Screen from "@/components/Screen";
import useAnimeById from "@/hooks/useAnimeById";
import Notification from "@/components/Notification";
import { supabase } from "@/utils/supabase";
import { useNavigation } from "@react-navigation/native";

export default function Details() {
  const { mal_id } = useLocalSearchParams();
  const { anime } = useAnimeById(mal_id);
  const navigation = useNavigation();

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

  const saveAnime = async () => {
    const { data } = await supabase.auth.getSession();
    const { session } = data;
    if (!session) {
      navigation.navigate("(account)/account" as never);
      return;
    }

    const { error } = await supabase
      .from("users_animes")
      .insert([{ 
        user_id: session?.user?.id, 
        anime_id: mal_id 
      }])
      .select();
    if (error) {
      console.log(error);
    } else {
      Alert.alert(`${title} agregado correctamente a la lista`);
    }
  };

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
          <Notification
            title={title}
            body={`Estas visitando la pagina del anime ${title}`}
          />
          <Image
            style={styles.image}
            source={{ uri: images?.jpg?.image_url }}
          />
        </View>
        <Pressable
          onPress={saveAnime}
          className="items-center justify-center bg-green-400 mx-[70px] py-[5px] rounded-md"
        >
          <Text className="text-white font-semibold">Agregar a favoritos</Text>
        </Pressable>
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
