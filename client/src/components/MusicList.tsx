import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MusicElement from "./MusicElement";
import { getUserAction } from "../features/song-slice";
import { RootState, AppDispatch } from "../redux/store";
import { MdAddCircle } from "react-icons/md";
import {motion} from "framer-motion"

const MusicList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const { data, isLoading } = useSelector(
        (state: RootState) => state.songs.songs
    );
    useEffect(() => {
        dispatch(getUserAction());
    }, []);

    return (
        <div className="flex flex-col gap-4 items-center w-full">
            <div className="w-full lg:w-3/4 px-3">
                <table className="min-w-full  text-gray-400 text-sm rounded-xl shadow-xl">
                    <thead className="hidden md:table-header-group">
                        <tr className="bg-gray-700 text-gray-100">
                            <th className="py-3 px-4 text-left">Cover</th>
                            <th className="py-3 px-4 text-left">Title</th>
                            <th className="py-3 px-4 text-left">Album</th>
                            <th className="py-3 px-4 text-left">Artist</th>
                            <th className="py-3 px-4 text-left">Genre</th>
                            <th className="py-3 px-4 text-left">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data?.songs.map((music, index) => (
                            <MusicElement
                                key={index}
                                title={music.title}
                                album={music.album}
                                songImage={
                                    "https://storage.googleapis.com/download/storage/v1/b/afrochat-bucket/o/rophi1.webp?generation=1724844289317140&alt=media"
                                }
                                artist={music.artist}
                                genre={music.gener}
                            />
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="w-[73%] relative">
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="addbutton rounded-xl bg-orange-900 text-gray-400 flex px-3 py-2 gap-3 cursor-pointer absolute right-0 "
                >
                    <p className="">Add Music</p>
                    <MdAddCircle className="text-3xl" />
                </motion.div>
            </div>
        </div>
    );
};

export default MusicList;
