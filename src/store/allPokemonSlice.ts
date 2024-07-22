import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface resultsType {
  name: string;
  url: string;
}

const initialState: {
  allPoke: resultsType[];
  tooltipPoke: resultsType[];
  searchPoke: resultsType[];
} = {
  allPoke: [],
  tooltipPoke: [],
  searchPoke: [],
};

export const allPokemonSlice = createSlice({
  name: "allPokemon",
  initialState,
  reducers: {
    setAllPokemon: (state, action: PayloadAction<resultsType[]>) => {
      state.allPoke = action.payload;
    },
    setSearchPokemon: (state, action: PayloadAction<resultsType[]>) => {
      state.searchPoke = action.payload;
    },
    setTooltipPokemon: (state, action: PayloadAction<resultsType[]>) => {
      state.tooltipPoke = action.payload;
    },
  },
});

export const { setAllPokemon, setSearchPokemon, setTooltipPokemon } =
  allPokemonSlice.actions;

export default allPokemonSlice.reducer;
