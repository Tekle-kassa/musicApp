import React, { useEffect, useState } from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { motion } from "framer-motion";
import OverlayCard from "./OverlayCard";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";
import { updateSongAction } from "../features/update-song-slice";
import { MdClose } from "react-icons/md";
import { deleteSongAction } from "../features/delet-song-slice";

interface MusicElementProps {
  id: string;
  title: string;
  album: string;
  songImage: string;
  artist: string;
  genre: string;
}

const MusicElement = ({
  id,
  title,
  album,
  songImage,
  artist,
  genre,
}: MusicElementProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeletionModal, setShowDeletionModal] = useState(false);
  const [songTitle, setSongTitle] = useState(title);
  const [songAlbum, setSongAlbum] = useState(album);
  const [songArtist, setSongArtist] = useState(artist);
  const [songGenre, setSongGenre] = useState(genre);
  const [songFile, setSongFile] = useState<File | null>(null);

  const fetchSongContent = () => {
    setShowUpdateModal(true);
  };
  const inputClass =
    "peer w-full h-full bg-transparent text-blue-gray-700 font-sans font-normal outline outline-0 focus:outline-0 disabled:bg-blue-gray-50 disabled:border-0 transition-all placeholder-shown:border placeholder-shown:border-orange-500 placeholder-shown:border-t-blue-gray-200 border focus:border-2 border-t-transparent focus:border-t-transparent text-sm px-3 py-2.5 rounded-[7px] border-orange-500 focus:border-orange-400";
  const labelClass =
    "flex w-full h-full select-none pointer-events-none absolute left-0 font-normal !overflow-visible truncate peer-placeholder-shown:text-blue-gray-500 leading-tight peer-focus:leading-tight peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500 transition-all -top-1.5 peer-placeholder-shown:text-sm text-[11px] peer-focus:text-[11px] before:content[' '] before:block before:box-border before:w-2.5 before:h-1.5 before:mt-[6.5px] before:mr-1 peer-placeholder-shown:before:border-transparent before:rounded-tl-md before:border-t peer-focus:before:border-t-2 before:border-l peer-focus:before:border-l-2 before:pointer-events-none before:transition-all peer-disabled:before:border-transparent after:content[' '] after:block after:flex-grow after:box-border after:w-2.5 after:h-1.5 after:mt-[6.5px] after:ml-1 peer-placeholder-shown:after:border-transparent after:rounded-tr-md after:border-t peer-focus:after:border-t-2 after:border-r peer-focus:after:border-r-2 after:pointer-events-none after:transition-all peer-disabled:after:border-transparent peer-placeholder-shown:leading-[3.75] text-gray-500 peer-focus:text-gray-300 before:border-orange-400 peer-focus:before:!border-gray-900 after:border-orange-400 peer-focus:after:!border-orange-400";
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSongFile(event.target.files[0]);
    }
  };
  const updateSong = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id", id);
    formData.append("title", songTitle);
    formData.append("album", songAlbum);
    formData.append("artist", songArtist);
    formData.append("genre", songGenre);
    formData.append("songImage", songFile as Blob);
    dispatch(updateSongAction(formData));
  };
  const deleteSong = (e: React.FormEvent) => {
    dispatch(deleteSongAction(id));
  };
  return (
    <>
      {/* Table Row for Larger Screens */}
      <tr className="hover:bg-gray-900 transition duration-300 hidden md:table-row shadow-lg shadow-gray-900">
        <td className="py-3 px-4">
          <img
            className="w-12 h-12 object-fill rounded-xl"
            src={songImage}
            alt="album cover"
          />
        </td>
        <td className="py-3 px-4 text-gray-300 text-base">{title}</td>
        <td className="py-3 px-4">{album}</td>
        <td className="py-3 px-4">{artist}</td>
        <td className="py-3 px-4">{genre}</td>
        <td className="py-6 px-4 flex gap-12">
          <MdEdit className="cursor-pointer" onClick={fetchSongContent} />
          <MdDelete
            className="cursor-pointer"
            onClick={() => setShowDeletionModal(true)}
          />
        </td>
      </tr>

      {/* Card Layout for Smaller Screens */}
      <div className="block md:hidden bg-gray-800 text-gray-400 p-4 rounded-xl shadow-xl mb-2">
        <div className="flex items-center gap-3 text-gray-100 mb-2">
          <img
            className="w-12 h-12 object-fill rounded-xl"
            src={songImage}
            alt="album cover"
          />
          <p className="text-gray-300 text-base">{title}</p>
        </div>
        <div className="mb-2">
          <span className="font-bold">Album: </span>
          {album}
        </div>
        <div className="mb-2">
          <span className="font-bold">Artist: </span>
          {artist}
        </div>
        <div className="mb-2">
          <span className="font-bold">Genre: </span>
          {genre}
        </div>
        <div className="flex gap-6">
          <MdEdit className="cursor-pointer" onClick={updateSong} />
          <MdDelete className="cursor-pointer" />
        </div>
      </div>
      {showUpdateModal && (
        <OverlayCard
          setShowModal={setShowUpdateModal}
          customClass="bg-gray-800 w-full lg:w-1/2 text-gray-400 p-4 rounded-xl shadow-xl"
        >
          <div className=" w-full text-gray-400 p-4">
            <form className="flex flex-col gap-8">
              <div className="flex gap-3">
                <div className="relative w-full min-w-32 h-10 lg:h-14">
                  <input
                    className={inputClass}
                    placeholder=" "
                    value={songTitle}
                    onChange={(e) => setSongTitle(e.target.value)}
                  />
                  <label className={labelClass}>Music Title</label>
                </div>
                <div className="relative w-full min-w-32 h-10 lg:h-14">
                  <input
                    className={inputClass}
                    placeholder=" "
                    value={songAlbum}
                    onChange={(e) => setSongAlbum(e.target.value)}
                  />
                  <label className={labelClass}>Album</label>
                </div>
              </div>

              <div className="relative w-full min-w-32 h-10 lg:h-14">
                <input
                  className={inputClass}
                  placeholder=" "
                  value={songArtist}
                  onChange={(e) => setSongArtist(e.target.value)}
                />
                <label className={labelClass}>Artist</label>
              </div>
              <div className="relative w-full min-w-32 h-10 lg:h-14">
                <input
                  className={inputClass}
                  placeholder=" "
                  value={songGenre}
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
                  onClick={() => setShowUpdateModal(false)}
                >
                  Cancel
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  type="submit"
                  className="bg-orange-900 text-gray-400 p-2 rounded-xl "
                  onClick={(e) => updateSong(e)}
                >
                  Update Music
                </motion.button>
              </div>
            </form>
          </div>
        </OverlayCard>
      )}
      {showDeletionModal && (
        <div className="absolute top-0 right-0 ">
          <div className="relative h-40 bg-black rounded-2xl shadow-2xl w-50 p-4 flex flex-col justify-center items-center gap-6">
            <MdClose
              className="text-orange-800 text-2xl cursor-pointer absolute top-4 right-4"
              onClick={() => setShowDeletionModal(false)}
            />
            <p>Are you sure do you want delete !</p>
            <div className="flex gap-4">
              <button
                className="px-3 py-2 rounded-2xl border-2 border-white"
                onClick={() => setShowDeletionModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-3 py-2 rounded-2xl bg-red-800 text-balance"
                onClick={deleteSong}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MusicElement;
