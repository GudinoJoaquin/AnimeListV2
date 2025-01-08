import Nav from "@/components/Nav";
import { View, Text, ScrollView } from "react-native";
export default function Account() {
  return (
    <View className="flex-1">
      <ScrollView>
        <Text>Account</Text>
      </ScrollView>
      <Nav />
    </View>
  );
}
