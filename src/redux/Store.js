import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./Reducers/AuthReducer";
import TempData from "./Reducers/TempData";
import bleReducer from "./Reducers/BLEReducer";
import audioReducer from "./Reducers/AudioReducer";

const config = {
  key: "root",
  storage: AsyncStorage,
};

const bleConfig = {
  key: "ble",
  storage: AsyncStorage,
  whitelist: ["pairedDevices"], // Only persist paired devices
};

const audioConfig = {
  key: "audio",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer({ ...config }, authReducer),
    temp: TempData,
    ble: persistReducer(bleConfig, bleReducer),
    audio: persistReducer(audioConfig, audioReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);

export default store;
