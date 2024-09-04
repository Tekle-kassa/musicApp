import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MusicElement from "./MusicElement";
import { getUserAction } from "../features/song-slice";
import { RootState, AppDispatch } from "../redux/store";
import { MdAddCircle } from "react-icons/md";
import { motion } from "framer-motion";
import OverlayCard from "./OverlayCard";
import { createSongAction } from "../features/create-song-slice";
import { song } from "../type/type";
import { MdKeyboardArrowUp } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";
import { title } from "process";
import { HashLoader } from "react-spinners";

const MusicList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [songs, setSongs] = useState<song[]>([]); // State to store the songs list
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [songAlbum, setSongAlbum] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [songImage, setSongImage] = useState<File | null>(null);
  const [sortparams, setSortParams] = useState<{
    element: string;
    asc: boolean;
  }>({ element: "title", asc: true });

  const { data, isLoading } = useSelector(
    (state: RootState) => state.songs.songs
  );
  const { isSuccessful: songCreated, isLoading: isCreating } = useSelector(
    (state: RootState) => state.createSongSlice
  );
  const {
    isSuccessful: isDeleteSuccessful,
    errors: deleteErrors,
    id: deletedSongId,
  } = useSelector((state: RootState) => state.deleteSong);

  const inputClass =
    "peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-orange-500 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-orange-500 focus:border-orange-400";
  const labelClass =
    "flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-300 before:border-orange-400 peer-focus:before:!border-gray-900 after:border-orange-400 peer-focus:after:!border-orange-400";

  useEffect(() => {
    dispatch(
      getUserAction({
        offset: 0,
        pageSize: 7,
        sort: sortparams.element,
        asc: sortparams.asc,
      })
    );
  }, [dispatch, sortparams]);

  useEffect(() => {
    if (data?.songs) {
      setSongs(data.songs);
    }

    if (songCreated) {
      alert("Your song has been created successfully");
      setShowCreateModal(false);
    }

    if (isDeleteSuccessful) {
      alert("Song Deleted Successfully");
      setSongs((prevSongs) =>
        prevSongs.filter((song) => song._id !== deletedSongId)
      );
    } else if (deleteErrors) {
      alert("Error Deleting Song, try again");
    }
  }, [data, songCreated, isDeleteSuccessful, deleteErrors, deletedSongId]);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSongImage(event.target.files[0]);
    }
  };

  const handleCreateSong = (e: React.FormEvent) => {
    e.preventDefault();
    if (songTitle && songAlbum && songArtist && songGenre && songImage) {
      const formSong = new FormData();
      formSong.append("title", songTitle);
      formSong.append("album", songAlbum);
      formSong.append("artist", songArtist);
      formSong.append("genre", songGenre);
      formSong.append("songImage", songImage);
      dispatch(createSongAction(formSong));
    } else {
      alert("Please fill all fields");
    }
  };

  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="w-full lg:w-3/4 px-3">
        <table className="min-w-full text-gray-400 text-sm rounded-xl shadow-xl">
          <thead className="hidden md:table-header-group">
            <tr className="border-t border-t-1 border-yellow-900 border-opacity-40 text-gray-100 bg-red-500">
              <th className="py-3 px-4 text-left hover:text-gray-600 "></th>
              <th className="py-3 px-4 text-left hover:text-gray-600 ">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() =>
                      setSortParams((prev) => ({
                        element: "title",
                        asc: !prev.asc,
                      }))
                    }
                  >
                    Title
                  </button>
                  <div className="flex flex-col gap-0 tracking-tighter">
                    <MdKeyboardArrowUp
                      className={`text-lg text-gray-400 ${
                        sortparams.element === "title" && sortparams.asc
                          ? "text-orange-900"
                          : ""
                      }`}
                    />
                    <MdKeyboardArrowDown
                      className={`text-lg text-gray-400 ${
                        sortparams.element === "title" && !sortparams.asc
                          ? "text-orange-900"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th className="py-3 px-4 text-left hover:text-gray-600">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() =>
                      setSortParams((prev) => ({
                        element: "album",
                        asc: !prev.asc,
                      }))
                    }
                  >
                    Album
                  </button>
                  <div className="flex flex-col gap-0 tracking-tighter">
                    <MdKeyboardArrowUp
                      className={`text-lg text-gray-400 ${
                        sortparams.element === "album" && sortparams.asc
                          ? "text-orange-900"
                          : ""
                      }`}
                    />
                    <MdKeyboardArrowDown
                      className={`text-lg text-gray-400 ${
                        sortparams.element === "album" && !sortparams.asc
                          ? "text-orange-900"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th className="py-3 px-4 text-left hover:text-gray-600">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() =>
                      setSortParams((prev) => ({
                        element: "artist",
                        asc: !prev.asc,
                      }))
                    }
                  >
                    Artist
                  </button>
                  <div className="flex flex-col gap-0 tracking-tighter">
                    <MdKeyboardArrowUp
                      className={`text-lg text-gray-400 ${
                        sortparams.element === "artist" && sortparams.asc
                          ? "text-orange-900"
                          : ""
                      }`}
                    />
                    <MdKeyboardArrowDown
                      className={`text-lg text-gray-400 ${
                        sortparams.element === "artist" && !sortparams.asc
                          ? "text-orange-900"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th className="py-3 px-4 text-left hover:text-gray-600">
                <div className="flex gap-2 items-center">
                  <button
                    onClick={() =>
                      setSortParams((prev) => ({
                        element: "genre",
                        asc: !prev.asc,
                      }))
                    }
                  >
                    Genre
                  </button>
                  <div className="flex flex-col gap-0 tracking-tighter">
                    <MdKeyboardArrowUp
                      className={`text-lg text-gray-400 ${
                        sortparams.element === "genre" && sortparams.asc
                          ? "text-orange-900"
                          : ""
                      }`}
                    />
                    <MdKeyboardArrowDown
                      className={`text-lg text-gray-400 ${
                        sortparams.element === "genre" && !sortparams.asc
                          ? "text-orange-900"
                          : ""
                      }`}
                    />
                  </div>
                </div>
              </th>
              <th className="py-3 px-4 text-left">Actions</th>
            </tr>
          </thead>
          {isLoading ? (
            <div className="w-full absolute right-1/2 ">
              <HashLoader color="#FFA500" loading={true} size={80} />
            </div>
          ) : (
            <tbody className="relative">
              {songs.map((music, index) => (
                <MusicElement
                  key={index}
                  id={music._id}
                  title={music.title}
                  album={music.album}
                  songImage={music.songImage}
                  artist={music.artist}
                  genre={music.genre}
                />
              ))}
            </tbody>
          )}
        </table>
      </div>
      <div className="w-[73%] relative">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="addbutton rounded-xl bg-orange-900 text-gray-400 flex px-3 py-2 gap-3 cursor-pointer absolute right-0"
          onClick={() => setShowCreateModal(true)}
        >
          <p>Add Music</p>
          <MdAddCircle className="text-3xl" />
        </motion.div>
      </div>
      {showCreateModal && (
        <OverlayCard
          setShowModal={setShowCreateModal}
          customClass="bg-gray-800 w-full lg:w-1/2 text-gray-400 p-4 rounded-xl shadow-xl"
        >
          <div className="w-full text-gray-400 p-4">
            <form className="flex flex-col gap-8">
              <div className="flex gap-3">
                <div className="relative w-full min-w-32 h-10 lg:h-14">
                  <input
                    className={inputClass}
                    placeholder=" "
                    onChange={(e) => setSongTitle(e.target.value)}
                  />
                  <label className={labelClass}>Music Title</label>
                </div>
                <div className="relative w-full min-w-32 h-10 lg:h-14">
                  <input
                    className={inputClass}
                    placeholder=" "
                    onChange={(e) => setSongAlbum(e.target.value)}
                  />
                  <label className={labelClass}>Album</label>
                </div>
              </div>

              <div className="relative w-full min-w-32 h-10 lg:h-14">
                <input
                  className={inputClass}
                  placeholder=" "
                  onChange={(e) => setSongArtist(e.target.value)}
                />
                <label className={labelClass}>Artist</label>
              </div>
              <div className="relative w-full min-w-32 h-10 lg:h-14">
                <input
                  className={inputClass}
                  placeholder=" "
                  onChange={(e) => setSongGenre(e.target.value)}
                />
                <label className={labelClass}>Genre</label>
              </div>
              <div className="relative w-1/2 min-w-32 h-10 lg:h-14">
                <input
                  type="file"
                  className="peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-orange-500 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-orange-500 focus:border-orange-400"
                  onChange={handleImageChange}
                  placeholder=" "
                />
                <label className="flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-300 before:border-orange-400 peer-focus:before:!border-gray-900 after:border-orange-400 peer-focus:after:!border-orange-400">
                  Upload Cover Image
                </label>
              </div>
              <div className="flex gap-6 font-medium justify-end mt-8">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="button"
                  className="text-gray-300 border-2 border-orange-900 p-2 rounded-xl"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-orange-900 text-gray-400 p-2 rounded-xl"
                  onClick={handleCreateSong}
                >
                  Add Music
                </motion.button>
              </div>
            </form>
          </div>
        </OverlayCard>
      )}
    </div>
  );
};

export default MusicList;
