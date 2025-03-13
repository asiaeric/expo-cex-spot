import { MMKV } from "react-native-mmkv";

const encryptedStorage = new MMKV({
  id: "encrypted-storage",
  encryptionKey: process.env.STORE_ENCRYPTION_KEY,
});

export function storeCredentials(email: string, password: string) {
  encryptedStorage.set("email", email);
  encryptedStorage.set("password", password);
}

export function getCredentials() {
  const email = encryptedStorage.getString("email");
  const password = encryptedStorage.getString("password");
  if (email && password) {
    return { email, password };
  }
  return null;
}

export function clearCredentials() {
  encryptedStorage.delete("email");
  encryptedStorage.delete("password");
}
