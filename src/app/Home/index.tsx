import { View, Text, Image, TouchableOpacity } from "react-native";
import { styles } from "./styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Filter } from "@/components/Filter";

import { FilterStatus } from "@/types/FilterStatus";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];

export default function Home() {
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.forms}>
          <Input placeholder="O que você precisa comprar?" />
          <Button title="Comprar" />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {FILTER_STATUS.map((status) => (
              <Filter key={status} status={status} isActive />
            ))}
            <TouchableOpacity style={styles.clearButton}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </>
  );
}
