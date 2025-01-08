import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { View, Pressable, StyleSheet, Text } from "react-native";
import { Link } from "expo-router";
import { useRoute } from "@react-navigation/native";
import { useRouter } from "expo-router";
import { useEffect } from "react";

export default function Nav() {
  const route = useRoute();
  const router = useRouter()

  return (
    <View className="items-center">
      <View className="absolute bottom-[20px] ">
        <View className="">
          <View style={styles.navContainer}>
            <Link
              href="/"
              className={`items-center justify-center w-[50px] h-[50px] ${route.name === "index" ? "bg-blue-500" : ""} rounded-xl`}
              asChild
            >
              <Pressable>
                <FontAwesome
                  name="home"
                  size={24}
                  color={route.name === "index" ? "white" : "black"}
                />
              </Pressable>
            </Link>

            <Link
              href="/explore"
              asChild
              className={`items-center justify-center w-[50px] h-[50px] ${route.name === "explore/index" ? "bg-blue-500" : ""} rounded-xl`}
            >
              <Pressable>
                <FontAwesome
                  name="search"
                  size={24}
                  color={route.name === "explore/index" ? "white" : "black"}
                />
              </Pressable>
            </Link>

            <Link
              href="/season"
              asChild
              className={`items-center justify-center w-[50px] h-[50px] ${route.name === "season/index" ? "bg-blue-500" : ""} rounded-xl`}
            >
              <Pressable>
                <FontAwesome
                  name="calendar"
                  size={24}
                  color={route.name === "season/index" ? "white" : "black"}
                />
              </Pressable>
            </Link>

            <Link
              href="/list"
              asChild
              className={`items-center justify-center w-[50px] h-[50px] ${route.name === "list/index" ? "bg-blue-500" : ""} rounded-xl`}
            >
              <Pressable>
                <FontAwesome
                  name="list"
                  size={24}
                  color={route.name === "list/index" ? "white" : "black"}
                />
              </Pressable>
            </Link>

            <Link
              href="/account"
              asChild
              className={`items-center justify-center w-[50px] h-[50px] ${route.name === "account/index" ? "bg-blue-500" : ""} rounded-xl`}
            >
              <Pressable>
                <AntDesign
                  name="user"
                  size={24}
                  color={route.name === "account/index" ? "white" : "black"}
                />
              </Pressable>
            </Link>
            {/* <Pressable onPress={() => router.push('/')}>
              <FontAwesome
                name="home"
                size={24}
                color={route.name === "index" ? "white" : "black"}
              />
              <Text>Inicio</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/explore')}>
              <FontAwesome
                name="home"
                size={24}
                color={route.name === "index" ? "white" : "black"}
              />
              <Text>Explore</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/season')}>
              <FontAwesome
                name="home"
                size={24}
                color={route.name === "index" ? "white" : "black"}
              />
              <Text>Season</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/list')}>
              <FontAwesome
                name="home"
                size={24}
                color={route.name === "index" ? "white" : "black"}
              />
              <Text>List</Text>
            </Pressable>
            <Pressable onPress={() => router.push('/account')}>
              <FontAwesome
                name="home"
                size={24}
                color={route.name === "index" ? "white" : "black"}
              />
              <Text>Account</Text>
            </Pressable> */}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: "white",
    flexDirection: "row",
    width: 350,
    height: 60,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 10,
  },
});
