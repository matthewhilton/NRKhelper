import './App.css';

import { useState } from "react"
import VideoSelector from './components/videoselector.js';
import SubtitleViewer from './components/subtitleviewer.js';
import Tokeniser from './components/tokeniser';
import Contextualiser from './components/contextualiser';
import { Card, Tab, Tabs } from 'react-bootstrap';
import Translator from './components/translator';

function App() {
  const [programId, setProgramId] = useState(null);
  const [subtitle, setSubtitle] = useState(null);
  const [contextWord, setContextWord] = useState(null);

  return (
    <div className="App" style={{margin: 10}}>
      <h1> NRK Helper </h1>

      <div style={{display: 'flex', flexDirection: 'row'}}>
        <div style={{width: '50%', margin: 10}}>
          <VideoSelector onProgramId={(id) => setProgramId(id)}/>   
          <SubtitleViewer programId={programId} onSubtitleClicked={(subtitle) => setSubtitle(subtitle)}/>
        </div>
        <div style={{width: '50%', margin: 10}}>
          <Tabs defaultActiveKey="translate">
            <Tab eventKey="translate" title="Translation">
              <Translator text={subtitle} />
            </Tab>

            <Tab eventKey="analysis" title="Sentence Analysis">
              <Tokeniser text={subtitle} onTokenClicked={(token) => setContextWord(token)} />
              <Contextualiser programid={programId} word={contextWord} />
            </Tab>
          </Tabs>
        </div>
      </div>
    </div>
  );
}

export default App;
