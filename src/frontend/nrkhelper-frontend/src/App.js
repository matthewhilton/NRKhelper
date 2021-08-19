import './App.css';

import { useState } from "react"
import VideoSelector from './components/videoselector.js';
import SubtitleViewer from './components/subtitleviewer.js';
import Tokeniser from './components/tokeniser';

function App() {
  const [programId, setProgramId] = useState(null);
  const [subtitle, setSubtitle] = useState(null);

  return (
    <div className="App">
      <h1> NRK Helper </h1>

      <VideoSelector onProgramId={(id) => setProgramId(id)}/>   
      <SubtitleViewer programId={programId} onSubtitleClicked={(subtitle) => setSubtitle(subtitle)}/>
      <Tokeniser text={subtitle} />
      
    </div>
  );
}

export default App;
