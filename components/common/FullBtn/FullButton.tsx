import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./fullbutton.style";
import { colors } from "../../../constants/theme";

interface FullButtonProps {
  text: string;
  handlePress: () => void;
  loading?: boolean;
}
const FullButton = ({ text, handlePress, loading }: FullButtonProps) => {
  return (
    <TouchableOpacity style={!loading ? styles.button : { ...styles.button, backgroundColor: colors.secondary }} onPress={handlePress} disabled={loading}>
      <Text style={{ color: "white", fontWeight: "900", fontSize: 17 }}>
        {text} {loading ? <ActivityIndicator color={"#fff"} /> : null}
      </Text>
    </TouchableOpacity>
  );
};

export default FullButton;
