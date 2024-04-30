import { View, Text, SafeAreaView, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Stack, router } from "expo-router";
import IconContainer from "../../components/common/IconContainer/IconContainer";
import { colors, sizes } from "../../constants/theme";
import { styles } from "../auth/auth.style";
import FullButton from "../../components/common/FullBtn/FullButton";
import { useFormik } from "formik";
import { api } from "../utils/api";
import { io } from "socket.io-client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";
import { Audio } from "expo-av";
import { Button } from "react-native";

interface ValueProps {
  subject: string;
  topic: string;
  curriculum: string;
  level: string;
}
export default function Create() {
  const [id, setId] = useState("");
  const [loading, setLoading] = useState(false);
  const [recording, setRecording] = useState<any>();
  const [audio, setAudio] = React.useState({});

  async function startRecording() {
    try {
      const perm = await Audio.requestPermissionsAsync();
      if (perm.status === "granted") {
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: true,
          playsInSilentModeIOS: true,
        });
        const { recording } = await Audio.Recording.createAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        setRecording(recording);
      }
    } catch (err) {}
  }
  async function stopRecording() {
    // setRecording(undefined);
    await recording.stopAndUnloadAsync();
    const { sound, status } = await recording.createNewLoadedSoundAsync();
    setRecording({
      sound: sound,
      file: recording.getURI(),
    });
  }
  const initialValues = {
    subject: "",
    topic: "",
    curriculum: "",
    level: "",
  };

  const onSubmit = async (values: ValueProps) => {
    setLoading(true);
    console.log(recording);

    const formData = new FormData();
    formData.append("subject", values.subject);
    formData.append("topic", values.topic);
    formData.append("curriculum", values.curriculum);
    formData.append("level", values.level);
    if (recording.file) {
      const audioFile = {
        uri: recording.file,
        name: "audio.mp3", // Name your audio file appropriately
        type: "audio/mpeg", // Adjust the MIME type based on your audio file type
      };
      formData.append("audio", audioFile);
    }
    try {
      const createNote = await api.form({ endpoint: "/note/audio", payload: formData });
      console.log("create note function", createNote);
      console.log(formData);
      setId(createNote?.id);
      Toast.show({
        type: "info",
        text1: "Note Generating...",
      });
    } catch (err) {
      console.error(err);
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
      setLoading(false);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Please check your internet connection",
      });
    });
    socket.on("note", (note) => {
      console.log("final note", note);
      console.log("id", note.note.id);
      setId(note.note.id);
      Toast.show({
        type: "success",
        text1: "Note Generated!",
        text2: "",
      });
      router.push({ pathname: "/view", params: { id: note.note.id } });
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
            <FullButton text={recording ? "Stop Recording" : "Start Recording"} handlePress={recording ? stopRecording : startRecording} />
            <View style={{ marginBottom: 10 }}></View>
            <FullButton text={loading ? "Jotting" : "Start Jotting"} handlePress={formik.handleSubmit} loading={loading} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}
