import { createStore } from "easy-peasy";
import { MMKV } from "react-native-mmkv";

import { model } from "./models";

export const storage = new MMKV();

const store = createStore(model);

export default store;
