import { useState } from "react";
import { CardGroup, Card, InputGroup, FormControl, Button } from "react-bootstrap";
import useSWR from "swr";
import Subtitle from "./subtitle";
import {apiUrl} from "../apiurl"

const SubtitleViewer = ({programId, onSubtitleClicked = () => {}}) => {
    return(
        <Card className="bg-dark" style={{borderRadius: 5}}>
            <Card.Body>
                <Card.Title>
                    Subtitles
                </Card.Title>
                {programId ? <SubtitleElements programId={programId} onSubtitleClicked={onSubtitleClicked}/> : "No Program"}
            </Card.Body>
        </Card>
    )
}

const SubtitleElements = ({programId, onSubtitleClicked = () => {}}) => {
    const { data, error } = useSWR(`${apiUrl}/subtitles?programid=${programId}`, { refreshInterval: 0 })
    const [search, setSearch] = useState("");
    const loading = !data && !error;

    if(loading) {
        return <p> Loading... </p>;
    }

    if(!data) {
        return null;
    }

    const subtitles = data.subtitles;
    const filteredSubtitles = subtitles.filter(subtitle => subtitle.includes(search) || search === "");
    const subtitleElements = filteredSubtitles.map((subtitle, i) => <Subtitle key={i} text={subtitle} onClick={(item) => onSubtitleClicked(item)}/>);

    return (
        <div>
            <InputGroup style={{marginBottom: 10}} className="bg-dark">
                <InputGroup.Text id="basic-addon1"> Filter </InputGroup.Text>
                <FormControl value={search} onChange={(e) => setSearch(e.target.value)} />
            </InputGroup>
            <CardGroup style={{height: '70vh', overflow: 'scroll'}}> {subtitleElements} </CardGroup>
        </div>
    )
}

export default SubtitleViewer;