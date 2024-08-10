import { configureStore } from "@reduxjs/toolkit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { persistReducer, persistStore } from "redux-persist";
import authReducer from "./Reducers/AuthReducer";
import TempData from "./Reducers/TempData";

const config = {
  key: "root",
  storage: AsyncStorage,
};

const store = configureStore({
  reducer: {
    auth: persistReducer({ ...config }, authReducer),
    temp: TempData,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persister = persistStore(store);

export default store;
