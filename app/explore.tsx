import Nav from "@/components/Nav";
import { View, Text, ScrollView} from "react-native";
export default function Explore() {
  return (
    <View className="flex-1">
      <ScrollView>
        <Text>Explore</Text>
      </ScrollView>
      <Nav />
    </View>
  );
}

