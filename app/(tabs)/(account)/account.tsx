import React, { useEffect, useState } from "react";
import { Text, TextInput, View, Pressable, Alert, ActivityIndicator, FlatList } from "react-native";
import Screen from "@/components/Screen";
import { supabase } from "@/utils/supabase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { AnimeProps } from "@/utils/interfaces";

type VisibleType = "signin" | "signup";

type AuthProps = {
  setVisible: React.Dispatch<React.SetStateAction<VisibleType>>;
  setSession?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type RootStackParamList = {
  "(account)/account": { key: string } | undefined; // La clave `key` es opcional
  "(other)/screen": undefined; // Otras pantallas
};

type AccountScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, "(account)/account">;


export default function Account() {
  const [visible, setVisible] = useState<VisibleType>("signin");
  const [session, setSession] = useState<boolean>(false);
  const [animeIds, setAnimeIds] = useState<number[]>([]);
  const [animes, setAnimes] = useState<AnimeProps[]>([]);
  const navigation = useNavigation<AccountScreenNavigationProp>();

  useEffect(() => {
    const handleSession = async () => {
      const { data: sessionInfo } = await supabase.auth.getSession();
      setSession(!!sessionInfo?.session); // Actualiza la sesión según los datos obtenidos
    };

    const getAnimesData = async () => {
      const { data: dataSession } = await supabase.auth.getSession();
      const { session } = dataSession;
      if (session?.user?.id) {
        const { data: users_animes, error } = await supabase
          .from("users_animes")
          .select("anime_id")
          .eq("user_id", session.user.id);
        if (error) {
          console.error("Error fetching anime IDs:", error);
        } else if (users_animes) {
          setAnimeIds(users_animes.map((entry) => entry.anime_id));
        }
      }
    };

    handleSession();
    getAnimesData();

    supabase.auth.onAuthStateChange((event, session) => {
      setSession(!!session);
    });
  }, []); // Se ejecuta solo al montar

  useEffect(() => {
    const fetchAnimeById = async (id: number) => {
      try {
        const response = await fetch(`https://api.jikan.moe/v4/anime/${id}/`);
        const data = await response.json();
        return data.data; // Devolvemos solo los datos del anime
      } catch (err) {
        console.error("Error fetching anime:", err);
        return null;
      }
    };

    const fetchAnimes = async () => {
      const fetchedAnimes = [];
      for (const id of animeIds) {
        const anime = await fetchAnimeById(id);
        if (anime) {
          fetchedAnimes.push(anime);
        }
      }
      setAnimes(fetchedAnimes); // Guardamos los animes completos en el estado
    };

    if (animeIds.length > 0) {
      fetchAnimes();
    }
  }, [animeIds]);

  useEffect(() => {
    console.log("Animes:", animes); // Para depurar los animes obtenidos
  }, [animes]);

  const signOut = async () => {
    await supabase.auth.signOut();
    navigation.navigate("(account)/account", {
      key: Math.random().toString(), // Genera una clave única para forzar la recarga.
    });
  };

  return (
    <Screen>
      {session ? (
        <View>
          <Text>Ya iniciaste sesión</Text>
          <Pressable className="bg-red-500 p-[20px]" onPress={signOut}>
            <Text>Cerrar Sesión</Text>
          </Pressable>
          <Text>Animes guardados</Text>
          {animeIds.length === 0 ? (
            <Text>No tienes animes guardados.</Text>
          ) : animes.length === 0 ? (
            <ActivityIndicator size="large" color="#0000ff" />
          ) : (
            <FlatList
              data={animes}
              keyExtractor={(item) => item.mal_id.toString()}
              renderItem={({ item }) => (
                <View>
                  <Text>{item.title}</Text>
                  <Text>Score: {item.score}</Text>
                </View>
              )}
            />
          )}
        </View>
      ) : visible === "signin" ? (
        <SignIn setVisible={setVisible} />
      ) : (
        <SignUp setVisible={setVisible} />
      )}
    </Screen>
  );
}

function SignIn({ setVisible }: AuthProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const navigation = useNavigation<AccountScreenNavigationProp>();

  const storeSession = async (session: any) => {
    try {
      await AsyncStorage.setItem("session", JSON.stringify(session));
    } catch (error) {
      console.error("Error storing session", error);
    }
  };

  const handleSubmit = async () => {
    if (!password || !email.toLowerCase()) {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (data && data.session) {
        console.log(data);
        storeSession(data.session);
      }
      navigation.navigate("(account)/account", {
        key: Math.random().toString(), // Genera una clave única para forzar la recarga.
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex flex-col items-center justify-center mt-[70px] p-4">
      <Text className="text-2xl font-bold mb-6">Iniciar Sesión</Text>
      <TextInput
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="w-full max-w-md p-3 mb-6 border border-gray-300 rounded-md"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable
        className="w-full max-w-md p-3 mb-4 bg-blue-600 rounded-md"
        onPress={handleSubmit}
      >
        <Text className="text-center text-white font-medium">Iniciar Sesión</Text>
      </Pressable>
      <Pressable onPress={() => setVisible("signup")}>
        <Text className="text-blue-600 underline">
          ¿No tienes una cuenta? Regístrate
        </Text>
      </Pressable>
    </View>
  );
}

function SignUp({ setVisible }: AuthProps) {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repitedPassword, setRepitedPassword] = useState<string>("");
  const navigation = useNavigation<AccountScreenNavigationProp>();

  const handleSubmit = async () => {
    if (!password || !email.toLowerCase() || !repitedPassword) {
      Alert.alert("Todos los campos son obligatorios");
      return;
    }
    if (password !== repitedPassword) {
      Alert.alert("Las contraseñas deben coincidir");
      return;
    }
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });
      console.log(data);
      setVisible("signin");
      setEmail("");
      setPassword("");
      setRepitedPassword("");
      navigation.navigate("(account)/account", {
        key: Math.random().toString(), // Genera una clave única para forzar la recarga.
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View className="flex flex-col items-center justify-center mt-[70px] p-4">
      <Text className="text-2xl font-bold mb-6">Registrarse</Text>
      <TextInput
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        className="w-full max-w-md p-3 mb-4 border border-gray-300 rounded-md"
        placeholder="Repite la contraseña"
        value={repitedPassword}
        onChangeText={setRepitedPassword}
        secureTextEntry
      />
      <Pressable
        className="w-full max-w-md p-3 mb-4 bg-blue-600 rounded-md"
        onPress={handleSubmit}
      >
        <Text className="text-center text-white font-medium">Registrarse</Text>
      </Pressable>
      <Pressable onPress={() => setVisible("signin")}>
        <Text className="text-blue-600 underline">
          ¿Ya tienes cuenta? Inicia sesión
        </Text>
      </Pressable>
    </View>
  );
}
