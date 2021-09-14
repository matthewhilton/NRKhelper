import './App.css';
import { useState } from "react"
import VideoSelector from './components/videoselector.js';
import MainPage from './pages/mainpage';
import { Button } from 'react-bootstrap';

function App() {
  const [programData, setProgramData] = useState(null);

  return (
    <div className="App" style={{margin: 10}}>
      <div style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', margin: "20px", alignItems: 'center'}}>
        <div>
          <h2 style={{color: 'white', fontWeight: "bold"}}> NRKHelper </h2>
          {programData !== null && <Button onClick={() => setProgramData(null)} className="btn-secondary"> Change Video </Button> }
        </div>
       <div style={{display: "flex"}}>
            {programData && <img style={{height: "80px", borderRadius: "10px", marginRight: "20px"}} src={programData.heroimg} alt="Video hero"/>} 

            {programData && 
              <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center'}}>
                <h4 style={{color: 'white'}}> {programData.name} </h4>
                <b style={{color: 'white', fontWeight: "bold"}}> {programData.episodetitle} </b>
              </div>
            }
            
          </div>
      </div>
      
      {programData === null ? <VideoSelector onVideo={(data) => setProgramData(data)}/>  :  <MainPage programData={programData} /> }
    </div>
  );
}

export default App;
