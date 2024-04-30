import { View, Text, FlatList, TextInput } from "react-native";
import React, { useEffect, useState } from "react";
import { Slot, Stack, router } from "expo-router";
import { SafeAreaView } from "react-native";
import IconContainer from "../../../components/common/IconContainer/IconContainer";
import { styles } from "../auth.style";
import Button from "../../../components/auth/button/Button";
import axios from "axios";
import FullButton from "../../../components/common/FullBtn/FullButton";
import Toast from "react-native-toast-message";

const SignInLayout = () => {
  const methods = ["Social", "Email", "Phone"];
  const [isSelected, setIsSelected] = useState("Email");
  return (
    <View style={styles.auth}>
      <Stack.Screen
        options={{
          headerTitle: "Sign up",
          headerShadowVisible: false,
          headerLeft: () => (
            <IconContainer
              iconUrl={require("../../../assets/icons/back.png")}
              handlePress={() => {
                router.back();
              }}
            />
          ),
          headerRight: () => <IconContainer iconUrl={require("../../../assets/icons/more.png")} />,
        }}
      />
      <SafeAreaView style={{ flex: 1, alignItems: "center", width: "100%" }}>
        <Text style={{ fontSize: 30, fontFamily: "poppinsBold" }}>Register</Text>
        <Text style={{ fontSize: 15, fontFamily: "poppinsRegular", textAlign: "center" }}>Sign up using any of these methods</Text>
        <View style={{ flexDirection: "row", gap: 10, marginTop: 20 }}>
          {methods.map((item) => (
            <Button
              buttonText={item}
              isSelected={isSelected == item}
              disabled={true}
              handlePress={() => {
                setIsSelected(item);
                router.push(`./${item}`);
              }}
            />
          ))}
        </View>
        <View style={{ ...styles.inputWrapper, flex: 1, marginTop: 30 }}>
          <Slot />
        </View>
        {/* <FullButton /> */}
      </SafeAreaView>
    </View>
  );
};

export default SignInLayout;
