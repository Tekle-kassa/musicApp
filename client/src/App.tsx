import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState, AppDispatch } from "./redux/store";
import MusicList from "./components/MusicList";
import TotalCards from "./components/TotalCards";
import { GiLoveSong } from "react-icons/gi";
import { IoIosAlbums } from "react-icons/io";
import { RiUserHeartFill } from "react-icons/ri";
import { MdCategory } from "react-icons/md";
import { fetchTotalAction } from "./features/fetch-total-slice";

// const data = { totalSongs: 14, genres: 7, artists: 10, albums: 14 };

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { data, isLoading, errors } = useSelector(
    (state: RootState) => state.fetchTotal
  );
  useEffect(() => {
    dispatch(fetchTotalAction());
  }, []);
  return (
    <div className="bg-primary text-white flex flex-col items-center gap-6 min-h-screen h-auto py-10 overflow-auto">
      <div className="flex flex-wrap gap-4">
        <TotalCards>
          <div className="flex gap-2 items-center justify-center text-gray-200">
            <GiLoveSong className="text-white" size={30} />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl">Total Songs</h1>
              <p className="text-3xl font-semibold">{data?.totalSongs}</p>
            </div>
          </div>
        </TotalCards>
        <TotalCards>
          <div className="flex gap-2 items-center justify-center text-gray-200">
            <IoIosAlbums className="text-white" size={30} />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl">Albums</h1>
              <p className="text-3xl font-semibold">{data?.albums}</p>
            </div>
          </div>
        </TotalCards>
        <TotalCards>
          <div className="flex gap-2 items-center justify-center text-gray-200">
            <RiUserHeartFill className="text-white" size={30} />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl">Artist</h1>
              <p className="text-3xl font-semibold">{data?.artists}</p>
            </div>
          </div>
        </TotalCards>
        <TotalCards>
          <div className="flex gap-2 items-center justify-center text-gray-200">
            <MdCategory className="text-white" size={30} />
            <div className="flex flex-col items-center justify-center">
              <h1 className="text-xl">Genres</h1>
              <p className="text-3xl font-semibold">{data?.genres}</p>
            </div>
          </div>
        </TotalCards>
      </div>
      <MusicList />
    </div>
  );
}

export default App;
