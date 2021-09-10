import { useState } from "react";
import { Tab, Tabs } from "react-bootstrap";
import useSWR from "swr";
import { apiUrl } from "../apiurl";
import Contextualiser from "../components/contextualiser";
import SubtitleViewer from "../components/subtitleviewer";
import Tokeniser from "../components/tokeniser";
import Translator from "../components/translator";

const MainPage = ({programData}) => {
    const programid = programData.programid;

    const { data, error } = useSWR(`${apiUrl}/subtitles?programid=${programid}`, { refreshInterval: 0 })
    const subtitlesAvailable = data && !error;

    const [subtitle, setSubtitle] = useState(null);
    const [contextWord, setContextWord] = useState(null);

    if(subtitlesAvailable) {
        return(
            <div style={{display: 'flex', flexDirection: 'row'}}>
                <div style={{width: '50%', margin: 10}}>
                <SubtitleViewer onSubtitleClicked={(subtitle) => setSubtitle(subtitle)} subtitles={data.subtitles} />
                </div>
                <div style={{width: '50%', margin: 10, padding: 10, borderRadius: 5}} className="bg-light">
                <Tabs defaultActiveKey="translate">
                    <Tab eventKey="translate" title="Translation">
                    <Translator text={subtitle} />
                    </Tab>
    
                    <Tab eventKey="analysis" title="Sentence Analysis">
                    <Tokeniser text={subtitle} analysis={data.tokens} onTokenClicked={(token) => setContextWord(token)} />
                    <Contextualiser programid={programid} word={contextWord} />
                    </Tab>
                </Tabs>
                </div>
            </div>
        )
    } else {
        return <p> Loading... </p>
    }
}

export default MainPage;