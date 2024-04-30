import { View, Text, SafeAreaView } from "react-native";
import React from "react";
import { Stack, router } from "expo-router";
import IconContainer from "../../components/common/IconContainer/IconContainer";
import { colors, sizes } from "../../constants/theme";
import FullButton from "../../components/common/FullBtn/FullButton";

const Success = () => {
  return (
    <View style={{ backgroundColor: colors.white, flex: 1 }}>
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
                    router.push("/success");
                  }}
                />
                <IconContainer iconUrl={require("../../assets/images/memoji.png")} bg={true} size={"75%"} handlePress={() => {}} />
              </View>
            );
          },
        }}
      />
      <View style={{ height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <View style={{ borderWidth: 2, borderColor: colors.gray, width: "90%", height: 400, borderRadius: 30, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <Text style={{ fontSize: sizes.lg, fontFamily: "poppinsBold" }}>Note Generated Successfully</Text>
          <FullButton text="View Note" />
          <Text style={{ fontSize: sizes.lg, fontFamily: "poppinsBold" }}>Note Generated Successfully</Text>
        </View>
      </View>
    </View>
  );
};

export default Success;
