import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "../auth.style";
import OutlinedBtn from "../../../components/common/OutlinedBtn/OutlinedBtn";

const Social = () => {
  return (
    <View style={{ width: "100%" }}>
      <OutlinedBtn iconUrl={require("../../../assets/icons/google.png")} text={"Continue with Google"} />
      <OutlinedBtn iconUrl={require("../../../assets/icons/apple-logo.png")} text={"Continue with Apple"} />
      <OutlinedBtn iconUrl={require("../../../assets/icons/twitter.png")} text={"Continue with X"} />
      <OutlinedBtn iconUrl={require("../../../assets/icons/instagram.png")} text={"Continue with Instagram"} />
    </View>
  );
};

export default Social;
