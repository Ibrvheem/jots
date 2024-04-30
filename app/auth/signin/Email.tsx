import { View, TextInput, Text } from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import FullButton from "../../../components/common/FullBtn/FullButton";
import { api } from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { styles } from "../auth.style";
import { colors } from "../../../constants/theme";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

const Email = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    role: "teacher",
  };
  const onSubmit = async () => {
    setLoading(true);
    try {
      const login = await api.post({ endpoint: "login", payload: formik.values });
      console.log(login);
      if (login?.token) {
        router.push(`/home/`);
        AsyncStorage.setItem("token", login?.token);
        Toast.show({
          type: "success",
          text1: "Sign in successful",
        });
      }
      return login;
    } catch (err: any) {
      Toast.show({
        type: "error",
        text1: err.response.data.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const formik = useFormik({
    initialValues,
    onSubmit,
  });

  return (
    <View style={styles.inputWrapper}>
      <TextInput style={{ ...styles.input }} onChangeText={formik.handleChange("email")} onBlur={formik.handleBlur("email")} value={formik.values.email} placeholder="Enter your Email" />
      <TextInput
        style={{ ...styles.input }}
        secureTextEntry
        onChangeText={formik.handleChange("password")}
        onBlur={formik.handleBlur("password")}
        value={formik.values.password}
        placeholder="Enter Password"
      />
      <Text style={{ fontSize: 15, fontFamily: "poppins", color: colors.text, marginBottom: 10 }}>
        Don't have an accout?{" "}
        <Link href={"/auth/signup/Email"} style={{ fontSize: 15, fontFamily: "poppinsBold", color: colors.primary }}>
          Sign Up
        </Link>
      </Text>
      <FullButton handlePress={formik.handleSubmit} text={"Sign In"} loading={loading} />
    </View>
  );
};

export default Email;
