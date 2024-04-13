import { View, TextInput, Text } from "react-native";
import React from "react";
import { useFormik } from "formik";
import FullButton from "../../../components/common/FullBtn/FullButton";
import { api } from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { styles } from "../auth.style";
import { colors } from "../../../constants/theme";
import { Link, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Email = () => {
  const initialValues = {
    email: "",
    password: "",
    role: "teacher",
  };
  const onSubmit = async () => {
    try {
      const apiInstance = await api();
      const createAccount = await apiInstance.post({ endpoint: "login", payload: formik.values });
      AsyncStorage.setItem("token", createAccount?.data?.token);
      console.log("token", createAccount?.data?.token);
      if (createAccount?.data?.token) {
        router.push(`/home/`);
      }
      return createAccount;
    } catch (err) {
      console.error(err);
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
      <FullButton handlePress={formik.handleSubmit} text={"Sign In"} />
    </View>
  );
};

export default Email;
