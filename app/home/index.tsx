import { Stack, Tabs, router } from "expo-router";
import React, { useEffect, useState } from "react";
import { SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import IconContainer from "../../components/common/IconContainer/IconContainer";
import { colors } from "../../constants/theme";
import { styles } from "../auth/auth.style";
import { Image } from "react-native";
import { api } from "../utils/api";
import { FlatList } from "react-native-gesture-handler";
import dayjs from "dayjs";

function Home() {
  const [notes, setNotes] = useState([]);
  useEffect(() => {
    async function fetchNotes() {
      try {
        const notesResponse = await api.get("notes");
        setNotes(notesResponse);
        console.log("here", notesResponse);
      } catch (error) {
        console.error("Error fetching note:", error);
      }
    }

    fetchNotes();
  }, []);
  console.log("hwy", notes?.length);
  return (
    <ScrollView style={{ backgroundColor: colors.white, paddingHorizontal: 20 }}>
      <View style={styles.inputWrapper}>
        <TextInput style={{ ...styles.input, backgroundColor: colors.gray, height: 60, fontSize: 20, fontFamily: "poppinsRegular" }} placeholder="Search Jots" placeholderTextColor={colors.text} />
      </View>
      <Text style={{ fontSize: 25, fontFamily: "poppinsBold", marginBottom: 20 }}>Your Jots</Text>
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
      <View>
        <FlatList
          data={notes}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={{
                margin: 2,
                width: "98%",
                backgroundColor: colors.white,
                borderWidth: 1,
                borderColor: colors.gray,
                shadowColor: colors.gray,

                shadowOffset: {
                  width: 0,
                  height: 1,
                },
                shadowOpacity: 0.22,
                shadowRadius: 2.22,
                elevation: 3,
                borderRadius: 20,
                padding: 20,
                flexDirection: "row",
                marginBottom: 15,
              }}
              onPress={() => {
                router.push({ pathname: "/view", params: { id: item?.id } });
              }}
            >
              <View style={{ height: 100, width: "30%" }}>
                <Image
                  resizeMode="contain"
                  source={{
                    uri: item?.images[0]?.url,
                  }}
                  style={{ height: 100, width: 100, objectFit: "cover", borderRadius: 10, backgroundColor: colors.gray }}
                />
              </View>
              <View style={{ paddingLeft: 15, flexDirection: "row", justifyContent: "space-between", width: "70%" }}>
                <View>
                  <Text style={{ fontSize: 14, fontFamily: "poppinsBold", color: colors.text }}>{item.subject}</Text>
                  <Text style={{ fontSize: 16, fontFamily: "poppins", color: colors.text }}>{item.topic}</Text>
                  <Text style={{ fontSize: 15, fontFamily: "poppinsRegular", marginTop: 10, color: colors.text }}>{dayjs(item.created_at).format("D, MMMM YYYY")}</Text>
                </View>
                <View style={{ justifyContent: "space-between", alignItems: "flex-end" }}>
                  <View
                    style={{
                      borderColor: "rgb(62, 214, 37)",
                      backgroundColor: "rgba(62, 214, 37, 0.2)",
                      borderWidth: 1,
                      paddingHorizontal: 10,
                      height: 25,
                      borderRadius: 10,
                      marginLeft: "auto",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Text style={{ fontFamily: "poppinsBold", color: colors.text }}>DONE</Text>
                  </View>
                  <IconContainer
                    size="60%"
                    iconUrl={require("../../assets/icons/delete.png")}
                    bg={false}
                    handlePress={() => {
                      router.back();
                    }}
                  />
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </ScrollView>
  );
}

export default Home;
