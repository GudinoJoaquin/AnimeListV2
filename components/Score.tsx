import React from "react";
import { Text, View } from "react-native";

export default function Score({ score = 10 }) {
  // Función para obtener el color basado en el puntaje, en formato hexadecimal
  const getScoreColor = (score: number) => {
    if(!score) {
      return '#cecece'
    }

    const normalizedScore = Math.min(Math.max(score, 0), 10);

    // Calculamos el valor de rojo y verde
    const red = Math.round((1 - normalizedScore / 10) * 255);
    const green = Math.round((normalizedScore / 10) * 128);

    // Convertimos a hexadecimal
    const redHex = red.toString(16).padStart(2, "0");
    const greenHex = green.toString(16).padStart(2, "0");

    // Retornamos el color en formato hexadecimal
    return `#${redHex}${greenHex}00`;
  };

  return (
    <View className="items-center justify-center w-[40px] h-[40px] rounded-[10px]" style={{ backgroundColor: getScoreColor(score) }}>
      <Text
        className={` text-white font-bold text-[12px]`}
        
      >
        {score}
      </Text>
    </View>
  );
}
