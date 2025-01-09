import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { CurrentRenderContext } from "@react-navigation/native";

interface IconProps {
  size: number
  color: string
}

export const HomeIcon = ({ size, color }: IconProps) => {
  return <FontAwesome name="home" size={size} color={color} />;
};

export const SearchIcon = ({ size, color }: IconProps) => {
  return <FontAwesome name="search" size={size} color={color} />;
};

export const CalendarIcon = ({ size, color }: IconProps) => {
  return <FontAwesome name="calendar" size={size} color={color} />;
};

export const ListIcon = ({ size, color }: IconProps) => {
  return <FontAwesome name="list" size={size} color={color} />;
};

export const UserIcon = ({ size, color }: IconProps) => {
  return <AntDesign name="user" size={size} color={color} />;
};
