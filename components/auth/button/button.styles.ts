import { StyleSheet } from "react-native";
import { colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
  buttonContainer: (isSelected: boolean) => ({
    backgroundColor: isSelected ? "black" : "transparent",
    borderWidth: !isSelected ? 1 : 0,
    borderColor: colors.gray,
    borderRadius: 30,
    height: 50,
    width: "30%",
    alignItems: "center",
    justifyContent: "center",
  }),
  buttonText: (isSelected) => {
    return {
      color: isSelected ? colors.white : "black",
      fontFamily: "poppinsRegular",
      fontSize: 16,
    };
  },
});
