import { configureStore } from "@reduxjs/toolkit";
import { useSelector, type TypedUseSelectorHook } from "react-redux";
import { playerReducer } from "./slices/player";

export const store = configureStore({
  // informações que serão compartilhadas entre todos os componentes da aplicação.
  reducer: {
    player: playerReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
