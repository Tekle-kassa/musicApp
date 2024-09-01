import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {USERS, songType, songListStateType} from "../type/type";

const initialSongs: songListStateType = {
    songs: {
        data:null,
        isLoading:false,
        errors:'',
    }
};

export const songSlice = createSlice({
    name:USERS,
    initialState:initialSongs,
    reducers: {
      getUserAction: (state: songListStateType) => {
      state.songs.isLoading = true;
      state.songs.errors = '';
    },
    getUserSuccessAction: (state: songListStateType, { payload: songs }: PayloadAction<songType>) => {
      state.songs.isLoading = false;
      state.songs.data = songs;
    },
    getUserErrorAction: (state: songListStateType, { payload: error }: PayloadAction<string>) => {
      state.songs.isLoading = false;
      state.songs.errors = error;
    },
    }
})

export const {
  getUserAction,
  getUserSuccessAction,
  getUserErrorAction
} = songSlice.actions;
export default songSlice.reducer;