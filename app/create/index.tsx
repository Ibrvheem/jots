import { View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import IconContainer from "../../components/common/IconContainer/IconContainer";
import { colors, sizes } from "../../constants/theme";
import { styles } from "../auth/auth.style";
import Button from "../../components/auth/button/Button";
import FullButton from "../../components/common/FullBtn/FullButton";
import { useFormik } from "formik";
import { api } from "../utils/api";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Create() {
  const [id, setId] = useState("");
  const initialValues = {
    subject: "",
    topic: "",
    curriculum: "",
    level: "",
  };
  const onSubmit = async (values) => {
    try {
      const apiInstance = await api();
      const createNote = await apiInstance.post({ endpoint: "/note", payload: values });
      setId(createNote?.id);
    } catch (err) {
      console.log(err);
    }
  };
  const formik = useFormik({
    initialValues,
    onSubmit,
  });
  useEffect(() => {
    async function token() {
      const token = await AsyncStorage.getItem("token");
      return token;
    }
    const socket = io("http://127.0.0.1:5000/", {
      transports: ["polling"],
      auth: {
        token: token(),
      },
    });
    socket.on("connect", () => {
      console.log("Connected to Socket.IO server");
      socket.emit("join", { user_id: 1 });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from Socket.IO server");
    });
    socket.on("note", (note) => {
      console.log(note);
      router.push({ pathname: "/view", params: { id: id } });
    });
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: colors.white, paddingHorizontal: sizes.lg }}>
      <SafeAreaView>
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
                  <IconContainer iconUrl={require("../../assets/images/memoji.png")} bg={true} size={"75%"} handlePress={() => {}} />
                </View>
              );
            },
          }}
        />
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: sizes.lg, fontFamily: "poppinsBold" }}>Create a new Jot!</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={{ ...styles.input, height: 60, fontSize: 20, fontFamily: "poppinsRegular" }}
              placeholder="What is the subject?"
              placeholderTextColor={colors.text}
              onChangeText={formik.handleChange("subject")}
              onBlur={formik.handleBlur("subject")}
              value={formik.values.subject}
            />
            <TextInput
              style={{ ...styles.input, height: 60, fontSize: 20, fontFamily: "poppinsRegular" }}
              placeholder="What is the topic?"
              placeholderTextColor={colors.text}
              onChangeText={formik.handleChange("topic")}
              onBlur={formik.handleBlur("topic")}
              value={formik.values.topic}
            />
            <TextInput
              style={{ ...styles.input, height: 60, fontSize: 20, fontFamily: "poppinsRegular" }}
              placeholder="What is the curriculum?"
              placeholderTextColor={colors.text}
              onChangeText={formik.handleChange("curriculum")}
              onBlur={formik.handleBlur("curriculum")}
              value={formik.values.curriculum}
            />
            <TextInput
              style={{ ...styles.input, height: 60, fontSize: 20, fontFamily: "poppinsRegular" }}
              placeholder="What is the level?"
              placeholderTextColor={colors.text}
              onChangeText={formik.handleChange("level")}
              onBlur={formik.handleBlur("level")}
              value={formik.values.level}
            />
            <FullButton text={"Start Jotting"} handlePress={formik.handleSubmit} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
