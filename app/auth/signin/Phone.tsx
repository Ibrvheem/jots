import { View, Text, TextInput } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { styles } from "../auth.style";
import FullButton from "../../../components/common/FullBtn/FullButton";
const Phone = () => {
  return (
    <View style={styles.inputWrapper}>
      <TextInput style={{ ...styles.input }} placeholder="Enter your Phone Number" />
      <View style={{ width: "100%", height: "100%", justifyContent: "flex-end", paddingBottom: 20 }}>
        <FullButton
          text={"Sign In"}
          handlePress={() => {
            console.log("sign in button clicked");
          }}
        />
      </View>
    </View>
  );
};

export default Phone;
