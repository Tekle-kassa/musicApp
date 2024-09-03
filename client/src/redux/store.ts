import createSagaMiddleware from "redux-saga";
import { configureStore } from "@reduxjs/toolkit";
import rootSaga from "../sagas/sagas";
import songs from "../features/song-slice";
import createSongSlice from "../features/create-song-slice";
import updateSong from "../features/update-song-slice";
import deleteSong from "../features/delet-song-slice";
import fetchTotal from "../features/fetch-total-slice";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    songs,
    createSongSlice,
    updateSong,
    deleteSong,
    fetchTotal,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default store;
