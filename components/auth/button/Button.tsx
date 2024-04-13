import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./button.styles";

interface ButtonProps {
  buttonText: string;
  isSelected: boolean;
  handlePress: () => void;
  disabled?: boolean;
}
const Button = ({ buttonText, isSelected, handlePress, disabled }: ButtonProps) => {
  return (
    <TouchableOpacity disabled={disabled} style={styles.buttonContainer(isSelected)} onPress={handlePress}>
      <Text style={styles.buttonText(isSelected)}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default Button;
