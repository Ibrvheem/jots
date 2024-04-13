import { View, TextInput, Text } from "react-native";
import React from "react";
import { useFormik } from "formik";
import FullButton from "../../../components/common/FullBtn/FullButton";
import { api } from "../../utils/api";
import { useMutation } from "@tanstack/react-query";
import { styles } from "../auth.style";

const Email = () => {
  const initialValues = {
    email: "",
    password: "",
    role: "teacher",
  };
  const onSubmit = async () => {
    try {
      const createAccount = await api().post({ endpoint: "/register", payload: formik.values });
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
        placeholder="Create Password"
      />
      <FullButton handlePress={formik.handleSubmit} text={"Sign Up"} />
    </View>
  );
};

export default Email;
