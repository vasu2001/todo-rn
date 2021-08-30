import AsyncStorage from "@react-native-async-storage/async-storage";
import { createStore } from "redux";
import { persistReducer, persistStore } from "redux-persist";
import Reducer from "./reducer";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { StoreType } from "./utils";

const storedReducer = persistReducer(
   {
      key: "root",
      storage: AsyncStorage,
   },
   Reducer,
);

export const store = createStore(storedReducer);
export const Persistor = persistStore(store as any);

export const useStoreSelector: TypedUseSelectorHook<StoreType> = useSelector;
