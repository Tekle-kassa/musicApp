import songs from "../features/song-slice";
import { songType } from "../type/type";
export type StateType = {
    songs: songType;
};
const rootReducers = {
    songs,
};

export default rootReducers;
