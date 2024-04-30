import { View, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Markdown from "react-native-markdown-display";
import { api } from "../utils/api";
import { colors } from "../../constants/theme";
import { Stack, router, useLocalSearchParams } from "expo-router";
import IconContainer from "../../components/common/IconContainer/IconContainer";

const ViewNote = () => {
  const [note, setNote] = useState("");
  const { id } = useLocalSearchParams();
  console.log("view", id);
  useEffect(() => {
    console.log("jerrsat");
    async function fetchNote() {
      try {
        const noteResponse = await api.get(`note/${id}`);
        let clean = noteResponse?.clean;
        let images = noteResponse?.images;
        images.map((image: { id: string; prompt: string; url: string }) => {
          clean = clean.replace(`[img:${image.id}]`, `![${image.prompt}](${image.url})`);
        });
        setNote(clean);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    }

    fetchNote();
  }, []);
  const styles = StyleSheet.create({
    image: {
      position: "relative",
      width: "100%",
      height: 250,
      borderRadius: 20,
    },
    text: {
      fontFamily: "poppinsBold",
    },
    heading2: {
      color: colors.primary,
      fontFamily: "poppinsBold !important",
    },
  });

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: "",
          headerShadowVisible: false,
          headerShown: true,

          headerLeft: () => (
            <IconContainer
              iconUrl={require("../../assets/icons/back.png")}
              bg={false}
              handlePress={() => {
                router.back();
              }}
            />
          ),
          headerRight: () => {
            return (
              <View style={{ flexDirection: "row", gap: 10 }}>
                <IconContainer
                  iconUrl={require("../../assets/icons/plus.png")}
                  bg={false}
                  size={"50%"}
                  handlePress={() => {
                    router.push("/create");
                  }}
                />
                <IconContainer iconUrl={require("../../assets/images/memoji.png")} bg={true} size={"75%"} handlePress={() => {}} />
              </View>
            );
          },
        }}
      />
      <ScrollView style={{ flex: 1, paddingHorizontal: 20, backgroundColor: colors.white, height: 10000 }}>
        <Markdown style={{ ...styles }}>{note}</Markdown>
      </ScrollView>
    </>
  );
};

export default ViewNote;
