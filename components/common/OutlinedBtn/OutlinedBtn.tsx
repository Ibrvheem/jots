import { View, Text, TouchableOpacity, Image, ImageSourcePropType } from "react-native";
import { styles } from "../../../app/auth/auth.style";
import { colors } from "../../../constants/theme";

type OutlinedBtnProps = {
  text: string;
  iconUrl?: ImageSourcePropType;
  handlePress?: () => void;
};
const OutlinedBtn = ({ text, handlePress, iconUrl }: OutlinedBtnProps) => {
  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity style={{ ...styles.input, alignItems: "center", flexDirection: "row", width: "100%" }} onPress={handlePress}>
        <Image source={iconUrl} style={{ height: 25, width: 25 }} />
        <Text style={{ fontFamily: "poppinsRegular", color: colors.text, letterSpacing: 0.4 }}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default OutlinedBtn;
