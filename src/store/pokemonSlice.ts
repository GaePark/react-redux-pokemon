import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface resultsType {
  name: string;
  url: string;
}

const initialState: {
  showPoke: resultsType[];
  searchShowPoke: resultsType[];
} = {
  showPoke: [],
  searchShowPoke: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setShowPokemon: (state, action: PayloadAction<resultsType[]>) => {
      state.showPoke = action.payload;
    },
    setSearchShowPokemon: (state, action: PayloadAction<resultsType[]>) => {
      state.searchShowPoke = action.payload;
    },
  },
});

export const { setShowPokemon, setSearchShowPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
