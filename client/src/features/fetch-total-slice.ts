import { createSlice, PayloadAction } from "@reduxjs/toolkit";
interface songtotalType {
    totalSongs: number;
    genres: number;
    artists: number;
    albums: number;
}
interface songFetchTootalType {
    data: songtotalType | null;
    isSuccessful?: boolean;
    isLoading?: boolean;
    errors?: string;
}

const initialTotal: songFetchTootalType = {
    data: null,
    isSuccessful: false,
    isLoading: false,
    errors: "",
};

export const fetchTotalSlice = createSlice({
    name: "fetchTotal",
    initialState: initialTotal,
    reducers: {
        fetchTotalAction: (state) => {
            state.isLoading = true;
            state.errors = "";
        },
        fetchTotalSuccessAction: (
            state,
            { payload }: PayloadAction<songtotalType>
        ) => {
            state.isLoading = false;
            state.isSuccessful = true;
            state.data = payload;
        },
        fetchTotalErrorAction: (
            state,
            { payload: error }: PayloadAction<string>
        ) => {
            state.isLoading = false;
            state.errors = error;
        },
    },
});

export const {
    fetchTotalAction,
    fetchTotalSuccessAction,
    fetchTotalErrorAction,
} = fetchTotalSlice.actions;
export default fetchTotalSlice.reducer;
