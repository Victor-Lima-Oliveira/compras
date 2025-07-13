import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterStatus } from "@/types/FilterStatus";

const ITENS_STORAGE_KEY = "@comprar:itens";

export type ItensStorage = {
  id: string;
  status: FilterStatus;
  description: string;
};

async function get(): Promise<ItensStorage[]> {
  try {
    const itens = await AsyncStorage.getItem(ITENS_STORAGE_KEY);

    return itens ? JSON.parse(itens) : [];
  } catch (error) {
    throw new Error("ITENS_GET: " + error);
  }
}

async function getByStatus(status: FilterStatus): Promise<ItensStorage[]> {
  const itens = await get();

  return itens.filter((item) => item.status === status);
}

async function save(item: ItensStorage[]): Promise<void> {
  try {
    await AsyncStorage.setItem(ITENS_STORAGE_KEY, JSON.stringify(item));
  } catch (error) {
    throw new Error("ITENS_SAVE: " + error);
  }
}

async function add(item: ItensStorage): Promise<ItensStorage[]> {
  try {
    const itens = await get();
    const updatedItens = [...itens, item];

    await save(updatedItens);

    return updatedItens;
  } catch (error) {
    throw new Error("ITENS_ADD: " + error);
  }
}

async function remove(id: string): Promise<void> {
  try {
    const itens = await get();
    const updatedItens = itens.filter((item) => item.id !== id);

    await save(updatedItens);
  } catch (error) {
    throw new Error("ITENS_REMOVE: " + error);
  }
}

async function clear(): Promise<void> {
  try {
    await AsyncStorage.removeItem(ITENS_STORAGE_KEY);
  } catch (error) {
    throw new Error("ITENS_CLEAR: " + error);
  }
}

async function toogleStatus(id: string): Promise<void> {
  try {
    const itens = await get();
    const updatedItens = itens.map((item) => 
      item.id === id
        ? {
            ...item,
            status:
              item.status === FilterStatus.DONE
                ? FilterStatus.PENDING
                : FilterStatus.DONE,
          }
        : item
    );

    await save(updatedItens);
  } catch (error) {
    throw new Error("ITENS_TOGGLE_STATUS: " + error);
  }
}

export const itensStorage = {
  get,
  getByStatus,
  add,
  remove,
  clear,
  toogleStatus
};
