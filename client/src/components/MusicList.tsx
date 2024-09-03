import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import MusicElement from "./MusicElement";
import { getUserAction } from "../features/song-slice";
import { RootState, AppDispatch } from "../redux/store";
import { MdAddCircle } from "react-icons/md";
import { motion } from "framer-motion";
import OverlayCard from "./OverlayCard";
import { createSongAction } from "../features/create-song-slice";
import { create } from "domain";

// "https://storage.googleapis.com/download/storage/v1/b/afrochat-bucket/o/rophi1.webp?generation=1724844289317140&alt=media";

const MusicList = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [songTitle, setSongTitle] = useState("");
  const [songAlbum, setSongAlbum] = useState("");
  const [songArtist, setSongArtist] = useState("");
  const [songGenre, setSongGenre] = useState("");
  const [songImage, setSongImage] = useState<File | null>(null);
  const { data, isLoading } = useSelector(
    (state: RootState) => state.songs.songs
  );
  useEffect(() => {
    dispatch(getUserAction());
  }, []);

  const inputClass =
    "peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-orange-500 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-orange-500 focus:border-orange-400";
  const labelClass =
    "flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-300 before:border-orange-400 peer-focus:before:!border-gray-900 after:border-orange-400 peer-focus:after:!border-orange-400";
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
    } else alert("Please fill all fields");
  };
  return (
    <div className="flex flex-col gap-4 items-center w-full">
      <div className="w-full lg:w-3/4 px-3">
        <table className="min-w-full  text-gray-400 text-sm rounded-xl shadow-xl">
          <thead className="hidden md:table-header-group">
            <tr className=" border-t border-t-1 border-yellow-900 border-opacity-40 text-gray-100">
              <th className="py-3 px-4 text-left"></th>
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
                id={music._id}
                title={music.title}
                album={music.album}
                songImage={music.songImage}
                artist={music.artist}
                genre={music.genre}
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
          onClick={() => setShowCreateModal(true)}
        >
          <p className="">Add Music</p>
          <MdAddCircle className="text-3xl" />
        </motion.div>
      </div>
      {showCreateModal && (
        <OverlayCard
          setShowModal={setShowCreateModal}
          customClass="bg-gray-800 w-full lg:w-1/2 text-gray-400 p-4 rounded-xl shadow-xl"
        >
          <div className=" w-full text-gray-400 p-4">
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
                <label className={labelClass}>Genere</label>
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
                  type="submit"
                  className="text-gray-300 border-2 border-orange-900 p-2 rounded-xl "
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-orange-900 text-gray-400 p-2 rounded-xl "
                  onClick={(e) => handleCreateSong(e)}
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
