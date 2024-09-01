import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { put, takeLatest } from "redux-saga/effects";
import { songType, GET_USER_BY_ID } from "../type/type"
import { getUserErrorAction, getUserSuccessAction } from "../features/song-slice";
import axios from "axios";

// Generator function
function* getUserSaga({ payload: id }: PayloadAction<string>) {
    try {
        // You can also export the axios call as a function.
        const response: AxiosResponse<songType> = yield axios.get(
            `https://musicappbackend-y4cf.onrender.com/api/songs?offset=0&pageSize=7`
        );
        yield put(getUserSuccessAction(response.data));
    } catch (error:any) {
        yield put(getUserErrorAction(error));
    }
}

// Generator function
export function* watchGetUser() {
    yield takeLatest(GET_USER_BY_ID, getUserSaga);
}
