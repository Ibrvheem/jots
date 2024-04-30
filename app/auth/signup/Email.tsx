import { View, TextInput, Text } from "react-native";
import React, { useState } from "react";
import { useFormik } from "formik";
import FullButton from "../../../components/common/FullBtn/FullButton";
import { api } from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { styles } from "../auth.style";
import Toast from "react-native-toast-message";
import { User } from "iconsax-react-native";

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
      const createAccount = await api.post({ endpoint: "/register", payload: formik.values });
      Toast.show({
        type: "success",
        text1: "Sign up successful",
        text2: `Go to sign in`,
      });
      return createAccount;
    } catch (err) {
      Toast.show({
        type: "info",
        text1: "It seems you already have an account",
        text2: "Go to sign in",
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
        placeholder="Create Password"
      />
      <FullButton handlePress={formik.handleSubmit} text={"Sign Up"} loading={loading} />
    </View>
  );
};

export default Email;
