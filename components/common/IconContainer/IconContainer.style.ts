import { StyleSheet } from "react-native";
import { colors } from "../../../constants/theme";

export const styles = StyleSheet.create({
  iconContainer: {
    borderRadius: 30,
    borderColor: colors.gray,
    borderWidth: 1,
    width: 43,
    height: 43,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    objectFit: "contain",
    objectPosition: "center",
  },
});
