import './App.css';

import { useState } from "react"
import VideoSelector from './components/videoselector.js';
import SubtitleViewer from './components/subtitleviewer.js';

function App() {
  const [programId, setProgramId] = useState(null);

  return (
    <div className="App">
      <h1> NRK Helper </h1>

      <VideoSelector onProgramId={(id) => setProgramId(id)}/>   
      <SubtitleViewer programId={programId}/>
    </div>
  );
}

export default App;
