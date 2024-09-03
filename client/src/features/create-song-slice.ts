import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { USERS, CREATOR, songType, songListStateType } from "../type/type";
interface songCreateType {
  isSuccessful?: boolean;
  isLoading?: boolean;
  errors?: string;
}

const initialSong: songCreateType = {
  isSuccessful: false,
  isLoading: false,
  errors: "",
};

export const createSongSlice = createSlice({
  name: "creator",
  initialState: initialSong,
  reducers: {
    createSongAction: (
      state,
      { payload: formSong }: PayloadAction<FormData>
    ) => {
      state.isLoading = true;
      state.errors = "";
    },
    createSongSuccessAction: (
      state,
      { payload: status }: PayloadAction<boolean>
    ) => {
      state.isLoading = false;
      state.isSuccessful = status;
    },
    createSongErrorAction: (
      state,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.errors = error;
    },
  },
});

export const {
  createSongAction,
  createSongSuccessAction,
  createSongErrorAction,
} = createSongSlice.actions;
export default createSongSlice.reducer;
