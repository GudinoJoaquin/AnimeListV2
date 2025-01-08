import Nav from "@/components/Nav";
import { View, Text, ScrollView} from "react-native";
export default function List() {
  return (
    <View className="flex-1">
      <ScrollView>
        <Text>list</Text>
      </ScrollView>
      <Nav />
    </View>
  );
}