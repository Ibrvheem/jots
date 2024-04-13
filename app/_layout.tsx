import { SplashScreen, Slot, Stack } from "expo-router";
import { useFonts } from "expo-font";
import { useEffect } from "react";
import { View } from "react-native";
import { colors } from "../constants/theme";

SplashScreen.preventAutoHideAsync();

export default function Layout() {
  const [fontsLoaded, fontError] = useFonts({
    poppinsRegular: require("../assets/fonts/Poppins/Poppins-Regular.ttf"),
    poppinsBold: require("../assets/fonts/Poppins/Poppins-Bold.ttf"),
    poppinsLight: require("../assets/fonts/Poppins/Poppins-Light.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: colors.white,
        },
      }}
    >
      <Slot />
    </Stack>
  );
}
