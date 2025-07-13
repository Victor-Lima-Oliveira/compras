import { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";

import { styles } from "./styles";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";

import { FilterStatus } from "@/types/FilterStatus";
import { itensStorage, ItensStorage } from "@/storage/itensStorage";

const FILTER_STATUS: FilterStatus[] = [FilterStatus.DONE, FilterStatus.PENDING];

export default function Home() {
  const [statefilter, setFilter] = useState(FilterStatus.DONE);
  const [stateNewItem, setNewItem] = useState("");
  const [stateItens, setItens] = useState<ItensStorage[]>([]);

  async function onClickAddItem() {
    if (!stateNewItem.trim())
      return Alert.alert("Atenção", "Você precisa digitar algo!");

    const newItem = {
      id: Math.random().toString(36).substring(2, 15),
      status: FilterStatus.PENDING,
      description: stateNewItem,
    };

    await itensStorage.add(newItem);
    setNewItem("");
    setFilter(FilterStatus.PENDING);
  }

  async function onClickRemoveItem(id: string) {
    try {
      await itensStorage.remove(id);
      await getItens();
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao remover o item!");
    }
  }

  async function getItens() {
    try {
      setItens(await itensStorage.getByStatus(statefilter));
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao carregar os itens!");
    }
  }

  function onClickClear() {
    Alert.alert("Atenção", "Deseja remover todos os itens?", [
      { text: "Sim", style: "cancel", onPress: () => onClickRemoveAll() },
      { text: "Não", style: "default" },
    ]);
  }

  async function onClickRemoveAll() {
    try {
      await itensStorage.clear();
      setItens([]);
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao remover todos os itens!");
    }
  }

  async function onClickToggleStatus(id: string) {
    try {
      await itensStorage.toogleStatus(id);
      await getItens();
    } catch (error) {
      console.log(error);
      Alert.alert("Atenção", "Ocorreu um erro ao atualizar o status!");
    }
  }

  useEffect(() => {
    getItens();
  }, [statefilter]);
  return (
    <>
      <View style={styles.container}>
        <Image
          source={require("@/assets/images/logo.png")}
          style={styles.logo}
        />
        <View style={styles.forms}>
          <Input
            placeholder="O que você precisa comprar?"
            onChangeText={setNewItem}
            value={stateNewItem}
          />
          <Button title="Comprar" onPress={onClickAddItem} />
        </View>

        <View style={styles.content}>
          <View style={styles.header}>
            {FILTER_STATUS.map((status) => (
              <Filter
                key={status}
                status={status}
                isActive={statefilter === status}
                onPress={() => setFilter(status)}
              />
            ))}
            <TouchableOpacity style={styles.clearButton} onPress={onClickClear}>
              <Text style={styles.clearText}>Limpar</Text>
            </TouchableOpacity>
          </View>

          <FlatList
            data={stateItens}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <Item
                data={item}
                onRemove={() => onClickRemoveItem(item.id)}
                onStatus={() => onClickToggleStatus(item.id)}
              />
            )}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            ListEmptyComponent={<Text style={styles.empty}>Lista vazia!</Text>}
          ></FlatList>
        </View>
      </View>
    </>
  );
}
