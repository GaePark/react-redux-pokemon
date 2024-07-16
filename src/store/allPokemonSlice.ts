import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface resultsType {
  name: string;
  url: string;
}

const initialState: { allPoke: resultsType[] } = {
  allPoke: [],
};

export const allPokemonSlice = createSlice({
  name: "allPokemon",
  initialState,
  reducers: {
    setAllPokemon: (state, action: PayloadAction<resultsType[]>) => {
      state.allPoke = action.payload;
    },
  },
});

export const { setAllPokemon } = allPokemonSlice.actions;

export default allPokemonSlice.reducer;
