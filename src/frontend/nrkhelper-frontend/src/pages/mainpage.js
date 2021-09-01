import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import { useRoute } from "wouter";
import Contextualiser from "../components/contextualiser";
import SubtitleViewer from "../components/subtitleviewer";
import Tokeniser from "../components/tokeniser";
import Translator from "../components/translator";

const MainPage = ({programData}) => {
    const programid = programData.programid;

    const [subtitle, setSubtitle] = useState(null);
    const [contextWord, setContextWord] = useState(null);

    return(
        <div style={{display: 'flex', flexDirection: 'row'}}>
            <div style={{width: '50%', margin: 10}}>
            <SubtitleViewer programId={programid} onSubtitleClicked={(subtitle) => setSubtitle(subtitle)}/>
            </div>
            <div style={{width: '50%', margin: 10, padding: 10, borderRadius: 5}} className="bg-light">
            <Tabs defaultActiveKey="translate">
                <Tab eventKey="translate" title="Translation">
                <Translator text={subtitle} />
                </Tab>

                <Tab eventKey="analysis" title="Sentence Analysis">
                <Tokeniser text={subtitle} onTokenClicked={(token) => setContextWord(token)} />
                <Contextualiser programid={programid} word={contextWord} />
                </Tab>
            </Tabs>
            </div>
        </div>
    )
}

export default MainPage;