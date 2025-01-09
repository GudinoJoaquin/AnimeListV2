import React from "react";
import { Text, ScrollView, View } from "react-native";
import AnimeList from "@/components/AnimeList";
import Recomended from "@/components/Recomended";
import Screen from "@/components/Screen";

export default function Index() {

  return (
    <Screen header>
      {/* Usar SearchInput con el hook */}
      <ScrollView>
          <View>
            <Text className="font-bold text-3xl px-[10px] py-[15px]">
              Recomendaciones
            </Text>
            <View className="items-center pb-[20px]">
              <Recomended />
            </View>
          </View>

        <View>
          <Text className="font-bold text-3xl px-[10px] py-[15px]">
            Mejores Animes
          </Text>
          <View className="items-center pb-[20px]">
            <AnimeList />
          </View>
        </View>
      </ScrollView>
    </Screen>
  );
}
