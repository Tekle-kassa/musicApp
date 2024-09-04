import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import {
  songType,
  GET_USER_BY_ID,
  CREATE_SONG,
  sortPrametrs,
} from "../type/type";
import {
  getUserErrorAction,
  getUserSuccessAction,
} from "../features/song-slice";
import {
  createSongSuccessAction,
  createSongErrorAction,
} from "../features/create-song-slice";
import axios from "axios";
import { all } from "redux-saga/effects";
import { deleteSongSuccessAction } from "../features/delet-song-slice";
import { deleteSongErrorAction } from "../features/delet-song-slice";
import { fetchTotalSuccessAction } from "../features/fetch-total-slice";
import { fetchTotalErrorAction } from "../features/fetch-total-slice";
import { title } from "process";

// Generator function
function* getUserSaga({
  payload: { offset = 0, pageSize = 7, sort = "title", asc = true },
}: PayloadAction<sortPrametrs>) {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<songType> = yield axios.get(
      `https://musicappbackend-y4cf.onrender.com/api/songs?offset=${offset}&pageSize=${pageSize}&sort=${sort}&order=${
        asc ? "asc" : "desc"
      }`
    );
    yield put(getUserSuccessAction(response.data));
  } catch (error: any) {
    yield put(getUserErrorAction(error));
  }
}

// Generator function
export function* watchGetUser() {
  yield takeLatest(GET_USER_BY_ID, getUserSaga);
}

function* createSongSaga({ payload: formSong }: PayloadAction<FormData>) {
  try {
    // You can also export the axios call as a function.
    const response: AxiosResponse<{
      tile: string;
      album: string;
      genere: string;
    }> = yield axios.post(
      `https://musicappbackend-y4cf.onrender.com/api/songs`,
      formSong
    );
    yield put(createSongSuccessAction(true));
  } catch (error: any) {
    yield put(createSongErrorAction(error));
  }
}
export function* watchCreateSong() {
  yield takeLatest("creator/createSongAction", createSongSaga);
}

function* updateSong({ payload: formSong }: PayloadAction<FormData>) {
  try {
    const response: AxiosResponse<{
      tile: string;
      album: string;
      genere: string;
    }> = yield axios.put(
      `https://musicappbackend-y4cf.onrender.com/api/songs`,
      formSong
    );
    yield put(createSongSuccessAction(true));
  } catch (error: any) {
    yield put(createSongErrorAction(error));
  }
}
export function* watchUpdateSong() {
  yield takeLatest("update/updateSongAction", updateSong);
}
function* deleteSong({ payload }: PayloadAction<string>) {
  try {
    const response: AxiosResponse = yield axios.delete(
      `https://musicappbackend-y4cf.onrender.com/api/songs/${payload}`
    );
    yield put(deleteSongSuccessAction(true));
  } catch (error: any) {
    yield put(deleteSongErrorAction(error));
  }
}
export function* watchDeleteSong() {
  yield takeLatest("delete/deleteSongAction", deleteSong);
}

function* fetchTotal() {
  try {
    const response: AxiosResponse = yield axios.get(
      `https://musicappbackend-y4cf.onrender.com/api/songs/statistics`
    );
    yield put(fetchTotalSuccessAction(response.data));
  } catch (error: any) {
    yield put(fetchTotalErrorAction(error));
  }
}
export function* watchFetchTotal() {
  yield takeLatest("fetchTotal/fetchTotalAction", fetchTotal);
}

export default function* rootSaga() {
  yield all([
    watchGetUser(),
    watchCreateSong(),
    watchUpdateSong(),
    watchDeleteSong(),
    watchFetchTotal(),
  ]);
}
