export type songType = {
    totalSongs: number;
    totalPages: number;
    currentPage: number;
    songs: {
        title: string;
        album: string;
        songImage: string;
        artist: string;
        gener: string;
    }[];
};
export type ISongState = {
    data: songType | null;
    isLoading: boolean;
    errors: string;
};
export type songListStateType = {
    songs: ISongState;
}

export const USERS = "users";
export type USERS = typeof USERS; // Typescript line

// (2)
export const GET_USER_BY_ID = `${USERS}/getUserAction`;
export type GET_USER_BY_ID = typeof GET_USER_BY_ID;
