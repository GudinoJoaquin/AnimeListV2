import { useState, useEffect } from "react";
import { Platform, Alert } from "react-native";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import * as Device from "expo-device";

// Configurar el manejador de notificaciones para la aplicación
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});

/**
 * Hook personalizado para obtener el expoPushToken.
 * @returns {string | null} expoPushToken: El token para notificaciones push, o null si no se pudo obtener.
 */
export function getExpoPushToken() {
  const [expoPushToken, setExpoPushToken] = useState<string | null>(null);

  useEffect(() => {
    async function registerForPushNotificationsAsync() {
      // Configuración del canal de notificaciones para Android
      if (Platform.OS === "android") {
        await Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
          vibrationPattern: [0, 250, 250, 250],
          lightColor: "#FF231F7C",
        });
      }

      // Verificar si el dispositivo es físico
      if (Device.isDevice) {
        // Obtener permisos para notificaciones
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== "granted") {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== "granted") {
          Alert.alert("Error", "Permission not granted to receive notifications!");
          return;
        }

        // Obtener el Project ID para EAS
        const projectId =
          Constants?.expoConfig?.extra?.eas?.projectId ??
          Constants?.easConfig?.projectId;

        if (!projectId) {
          Alert.alert("Error", "Project ID not found");
          return;
        }

        // Obtener el token de notificaciones push
        try {
          const { data } = await Notifications.getExpoPushTokenAsync({ projectId });
          setExpoPushToken(data);
        } catch (error) {
          console.error("Error fetching Expo push token:", error);
          Alert.alert("Error", "Failed to fetch Expo push token");
        }
      } else {
        Alert.alert("Error", "Must use physical device for push notifications");
      }
    }

    registerForPushNotificationsAsync();
  }, []);

  return expoPushToken;
}

export async function sendPushNotification(expoPushToken: string) {
    const message = {
      to: expoPushToken,
      sound: "default",
      title: "Dr.Stone",
      body: 'Episodio 2 "Science Journey" ya disponible en crunchyroll',
      data: { someData: "goes here" },
    };
  
    await fetch("https://exp.host/--/api/v2/push/send", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Accept-encoding": "gzip, deflate",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message),
    });
}