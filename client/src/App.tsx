import React from 'react';
import MusicList from './components/MusicList';


function App() {
  return (
    <div className="bg-primary text-white flex flex-col items-center gap-12 min-h-screen">
      <div className=''>total</div>
      <MusicList/>
   
    </div>
  );
}

export default App;
