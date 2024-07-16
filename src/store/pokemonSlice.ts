import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface resultsType {
  name: string;
  url: string;
}

const initialState: { showPoke: resultsType[] } = {
  showPoke: [],
};

export const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    setShowPokemon: (state, action: PayloadAction<resultsType[]>) => {
      state.showPoke = action.payload;
    },
  },
});

export const { setShowPokemon } = pokemonSlice.actions;

export default pokemonSlice.reducer;
