import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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

export const updateSongSlice = createSlice({
    name: "update",
    initialState: initialSong,
    reducers: {
        updateSongAction: (
            state,
            { payload: formData}: PayloadAction<FormData>
        ) => {
            state.isLoading = true;
            state.errors = "";
        },
        updateSongSuccessAction: (
            state,
            { payload: status }: PayloadAction<boolean>
        ) => {
            state.isLoading = false;
            state.isSuccessful = status;
        },
        updateSongErrorAction: (
            state,
            { payload: error }: PayloadAction<string>
        ) => {
            state.isLoading = false;
            state.errors = error;
        },
    },
});

export const {
    updateSongAction,
    updateSongSuccessAction,
    updateSongErrorAction,
} = updateSongSlice.actions;
export default updateSongSlice.reducer;
