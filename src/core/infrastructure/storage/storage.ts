// src/core/infrastructure/storage/storage.ts
import * as SecureStore from "expo-secure-store";
import { Platform } from "react-native";

class Storage {
  private static instance: Storage;

  private constructor() {}

  public static getInstance(): Storage {
    if (!this.instance) {
      this.instance = new Storage();
    }
    return this.instance;
  }

  async getItem(key: string): Promise<string | null> {
    if (Platform.OS === "web") {
      return localStorage.getItem(key);
    }
    return await SecureStore.getItemAsync(key);
  }

  async setItem(key: string, value: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.setItem(key, value);
      return;
    }
    await SecureStore.setItemAsync(key, value);
  }

  async removeItem(key: string): Promise<void> {
    if (Platform.OS === "web") {
      localStorage.removeItem(key);
      return;
    }
    await SecureStore.deleteItemAsync(key);
  }
}

export default Storage;
