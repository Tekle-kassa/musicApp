import React from "react";
import { MdDelete } from "react-icons/md";
import { MdEdit } from "react-icons/md";

interface MusicElementProps {
    title: string;
    album: string;
    songImage: string;
    artist: string;
    genre: string;
}

const MusicElement = ({
    title,
    album,
    songImage,
    artist,
    genre,
}: MusicElementProps) => {
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
                    <MdEdit className="cursor-pointer" />
                    <MdDelete className="cursor-pointer" />
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
                    <MdEdit className="cursor-pointer" />
                    <MdDelete className="cursor-pointer" />
                </div>
            </div>
        </>
    );
};

export default MusicElement;
