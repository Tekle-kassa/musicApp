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

export const deleteSongSlice = createSlice({
  name: "delete",
  initialState: initialSong,
  reducers: {
    deleteSongAction: (state, { payload: songId }: PayloadAction<string>) => {
      state.isLoading = true;
      state.errors = "";
    },
    deleteSongSuccessAction: (
      state,
      { payload: status }: PayloadAction<boolean>
    ) => {
      state.isLoading = false;
      state.isSuccessful = status;
    },
    deleteSongErrorAction: (
      state,
      { payload: error }: PayloadAction<string>
    ) => {
      state.isLoading = false;
      state.errors = error;
    },
  },
});

export const {
  deleteSongAction,
  deleteSongSuccessAction,
  deleteSongErrorAction,
} = deleteSongSlice.actions;
export default deleteSongSlice.reducer;
