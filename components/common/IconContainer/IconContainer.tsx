import { View, Text, Touchable, Image, DimensionValue } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { styles } from "./IconContainer.style";
import { ImageSourcePropType } from "react-native";
import { colors } from "../../../constants/theme";

interface props {
  iconUrl: ImageSourcePropType;
  handlePress?: () => void;
  bg?: boolean;
  size?: DimensionValue;
}
const IconContainer = ({ iconUrl, handlePress, bg, size }: props) => {
  return (
    <TouchableOpacity style={{ ...styles.iconContainer, backgroundColor: bg ? colors.primary : "transparent" }} onPress={handlePress}>
      <Image source={iconUrl} style={{ width: size ? size : "50%" }} resizeMode="contain" />
    </TouchableOpacity>
  );
};

export default IconContainer;
