import { View, Text, TouchableOpacity } from "react-native";
import { Trash } from "lucide-react-native";

import styles from "./styles";
import { StatusIcon } from "../StatusIcon";
import { FilterStatus } from "@/types/FilterStatus";

type ItemData = {
  status: FilterStatus;
  description: string;
};

type Props = {
  data: ItemData;
  onStatus: () => void;
  onRemove: () => void;
};

export function Item({ data, onRemove, onStatus }: Props) {
  return (
    <View style={styles.container}>
      <TouchableOpacity activeOpacity={0.8} onPress={onStatus}>
        <StatusIcon status={data.status} />
      </TouchableOpacity>

      <Text style={styles.description}>{data.description}</Text>

      <TouchableOpacity activeOpacity={0.8} onPress={onRemove}>
        <Trash size={18} color="#828282" />
      </TouchableOpacity>
    </View>
  );
}
