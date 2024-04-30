import { StyleSheet } from "react-native";
import { colors } from "../../constants/theme";

export const styles = StyleSheet.create({
  auth: { flex: 1, width: "100%", backgroundColor: colors.white, paddingHorizontal: 20, paddingVertical: 50 },
  inputWrapper: {
    width: "100%",
    marginVertical: 50,
    alignItems: "center",
  },
  input: { borderWidth: 1, borderColor: colors.gray, height: 50, borderRadius: 10, color: colors.text, padding: 10, marginVertical: 10, width: "100%" },
});
