import {
  Image,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  Pressable,
  Alert,
  Modal,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { useLocalSearchParams } from "expo-router";
import { Table, TableRow } from "../components/Tables";
import { Stack } from "expo-router/stack";
import Screen from "@/components/Screen";
import useAnimeById from "@/hooks/useAnimeById";
import Notification from "@/components/Notification";
import { supabase } from "@/utils/supabase";
import { useNavigation } from "@react-navigation/native";
import { lazy, SetStateAction, useState } from "react";
import { AnimeStatusType } from "@/utils/types";
import Dropdown from "@/components/Dropdown";
import { AnimeProps } from "@/utils/interfaces";

export default function Details() {
  const { mal_id } = useLocalSearchParams();
  const { anime } = useAnimeById(mal_id);
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

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
          onPress={() => setIsModalVisible(true)}
          className="items-center justify-center bg-green-400 mx-[70px] py-[5px] rounded-md"
        >
          <Text className="text-white font-semibold">Agregar a favoritos</Text>
        </Pressable>
        <Pressable
          onPress={() => setIsModalVisible(true)}
          className="items-center justify-center bg-blue-400 mx-[70px] py-[5px] rounded-md mt-[20px]"
        >
          <Text className="text-white">Mostrar modal</Text>
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
      {isModalVisible && (
        <SaveModal
          isModalVisible={isModalVisible}
          setIsModalVisible={setIsModalVisible}
          anime={anime}
        />
      )}
    </Screen>
  );
}


const SaveModal = ({
  isModalVisible,
  setIsModalVisible,
  anime
}: {
  isModalVisible: boolean;
  setIsModalVisible: React.Dispatch<SetStateAction<boolean>>;
  anime: AnimeProps
}) => {
  
  const { episodes, mal_id, title } = anime;

  const saveAnime = async () => {
    const { data } = await supabase.auth.getSession();
    const { session } = data;
  

    const { error } = await supabase
      .from("users_animes")
      .insert([
        {
          user_id: session?.user?.id,
          anime_id: mal_id,
          anime_score: selectedScore,
          anime_status: selectedStatus,
          anime_episodes_watched: selectedEpisodesWatched
        },
      ])
      .select();
    if (error) {
      console.log(error);
    } else {
      Alert.alert(`${title} agregado correctamente a la lista`);
      setIsModalVisible(false)
    }
  };



  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [selectedEpisodesWatched, setSelectedEpisodesWatched] =
    useState<number>(0);
  const [selectedStatus, setSelectedStatus] = useState<AnimeStatusType | null>(
    null
  );

  return (
    <Modal
      transparent={true}
      visible={isModalVisible}
      animationType="fade"
      onRequestClose={() => setIsModalVisible(false)}
      statusBarTranslucent
    >
      <View className="flex-1 bg-black/50 items-center justify-center">
        <View className="bg-white rounded-lg w-10/12 h-auto justify-around max-w-md shadow-lg">
          <Text className="text-xl font-semibold text-gray-800 text-center mt-[10px]">
            Guardar anime en favoritos
          </Text>

          <View className="flex-col items-center">
            <Text className="mt-[20px] mb-[-10px] font-bold text-xl">
              Status
            </Text>
            <View className="flex-row flex-wrap mb-[10px] mt-[20px] mx-[10px] gap-[10px]">
              <Pressable
                onPress={() => setSelectedStatus("watching")}
                className={`border ${
                  selectedStatus === "watching"
                    ? "border-green-600 bg-green-600 text-white font-semibold"
                    : "border-gray-500"
                } w-[90px] h-[35px] items-center justify-center`}
              >
                <Text
                  className={
                    selectedStatus === "watching"
                      ? "text-white font-semibold"
                      : ""
                  }
                >
                  Watching
                </Text>
              </Pressable>
              <Pressable
                onPress={() => {
                  setSelectedStatus("completed")
                  setSelectedEpisodesWatched(episodes)
                }}
                className={`border ${
                  selectedStatus === "completed"
                    ? "border-blue-600 bg-blue-600 text-white font-semibold"
                    : "border-gray-500"
                } w-[90px] h-[35px] items-center justify-center`}
              >
                <Text
                  className={
                    selectedStatus === "completed"
                      ? "text-white font-semibold"
                      : ""
                  }
                >
                  Completed
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedStatus("on hold")}
                className={`border ${
                  selectedStatus === "on hold"
                    ? "border-gray-400 bg-gray-400 text-white font-semibold"
                    : "border-gray-500"
                } w-[90px] h-[35px] items-center justify-center`}
              >
                <Text
                  className={
                    selectedStatus === "on hold"
                      ? "text-white font-semibold"
                      : ""
                  }
                >
                  On hold
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedStatus("plan to watch")}
                className={`border ${
                  selectedStatus === "plan to watch"
                    ? "border-yellow-500 bg-yellow-500 text-white font-semibold"
                    : "border-gray-500"
                } w-[120px] h-[35px] items-center justify-center`}
              >
                <Text
                  className={
                    selectedStatus === "plan to watch"
                      ? "text-white font-semibold"
                      : ""
                  }
                >
                  Plan to watch
                </Text>
              </Pressable>
              <Pressable
                onPress={() => setSelectedStatus("dropped")}
                className={`border ${
                  selectedStatus === "dropped"
                    ? "border-red-600 bg-red-600 text-white font-semibold"
                    : "border-gray-500"
                } w-[90px] h-[35px] items-center justify-center`}
              >
                <Text
                  className={
                    selectedStatus === "dropped"
                      ? "text-white font-semibold"
                      : ""
                  }
                >
                  Dropped
                </Text>
              </Pressable>
            </View>
          </View>

          <View className="flex-col items-center ">
            <Text className="mt-[20px] mb-[-10px] font-bold text-xl">
              Progress
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-[10px] mt-[20px] py-[5px]"
            >
              <Pressable
                  onPress={() => setSelectedEpisodesWatched(0)}
                >
                  <Text
                    className={`border ${
                      selectedEpisodesWatched === 0
                        ? "border-blue-600 bg-blue-600 text-white font-semibold"
                        : "border-gray-500"
                    } px-[10px] py-[5px] rounded-[2px] mx-[10px]`}
                  >
                    -
                  </Text>
                </Pressable>
              {Array.from({ length: episodes }, (_, index) => (
                <Pressable
                  key={index}
                  onPress={() => setSelectedEpisodesWatched(index + 1)}
                >
                  <Text
                    className={`border ${
                      selectedEpisodesWatched === index + 1
                        ? "border-blue-600 bg-blue-600 text-white font-semibold"
                        : "border-gray-500"
                    } px-[10px] py-[5px] rounded-[2px] mx-[10px]`}
                  >
                    {index + 1}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View className="flex-col items-center ">
            <Text className="mt-[20px] mb-[-10px] font-bold text-xl">
              Score
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              className="mb-[10px] mt-[20px] py-[5px]"
            >
              <Pressable onPress={() => setSelectedScore(null)}>
                  <Text
                    className={`border ${
                      selectedScore === null
                        ? "border-blue-600 bg-blue-600 text-white font-semibold"
                        : "border-gray-500"
                    } px-[10px] py-[5px] rounded-[2px] mx-[10px]`}
                  >
                    -
                  </Text>
                </Pressable>
              {Array.from({ length: 10 }, (_, index) => (
                <Pressable onPress={() => setSelectedScore(index + 1)} key={index}>
                  <Text
                    className={`border ${
                      selectedScore === index + 1
                        ? "border-blue-600 bg-blue-600 text-white font-semibold"
                        : "border-gray-500"
                    } px-[10px] py-[5px] rounded-[2px] mx-[10px]`}
                  >
                    {index + 1}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
          </View>

          <View className="flex-row justify-between p-[10px] z-0">
            <Pressable
              className="border border-gray-500 rounded-md px-4 py-2"
              onPress={() => setIsModalVisible(false)}
            >
              <Text className="text-gray-500 font-medium">Close</Text>
            </Pressable>
            <Pressable
              className="bg-blue-500 rounded-md px-4 py-2"
              onPress={saveAnime}
            >
              <Text className="text-white font-medium">Save</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

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
  dropdown: {
    width: 90,
    height: 40,
    backgroundColor: "white",
    borderRadius: 5,
    paddingLeft: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
