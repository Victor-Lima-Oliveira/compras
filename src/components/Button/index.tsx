import { TouchableOpacity, Text, TouchableOpacityProps } from "react-native";
import { styles } from "./styles";

type Props = TouchableOpacityProps & {
  title: string;
};

export default function Button({title, ...rest}: Props) {
  return (
    <TouchableOpacity style={styles.button} activeOpacity={0.8}>
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}
