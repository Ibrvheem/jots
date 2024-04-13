import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Redirect, Stack, router } from "expo-router";
import { Link } from "expo-router";
import { colors } from "../constants/theme";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function index() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <Redirect href="./auth/signin/Social" />
    </QueryClientProvider>
  );
}
