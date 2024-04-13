import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./fullbutton.style";

interface FullButtonProps {
  text: string;
  handlePress: () => void;
}
const FullButton = ({ text, handlePress }: FullButtonProps) => {
  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <Text style={{ color: "white", fontWeight: "600", fontSize: 17 }}>{text}</Text>
    </TouchableOpacity>
  );
};

export default FullButton;
