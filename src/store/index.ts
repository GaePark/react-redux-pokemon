import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";
import allPokemonSlice from "./allPokemonSlice";

export const store = configureStore({
  reducer: {
    allPokemon: allPokemonSlice,
    pokemon: pokemonSlice,
  },
});

export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore["dispatch"];
