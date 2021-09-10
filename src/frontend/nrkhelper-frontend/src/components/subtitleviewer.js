import { useState } from "react";
import { CardGroup, Card, InputGroup, FormControl } from "react-bootstrap";
import Subtitle from "./subtitle";

const SubtitleViewer = ({onSubtitleClicked = () => {}, subtitles}) => {
    return(
        <Card className="bg-dark" style={{borderRadius: 5}}>
            <Card.Body>
                <Card.Title>
                    Subtitles
                </Card.Title>
                <SubtitleElements subtitles={subtitles} onSubtitleClicked={onSubtitleClicked}/>
            </Card.Body>
        </Card>
    )
}

const SubtitleElements = ({subtitles, onSubtitleClicked = () => {}}) => {
    const [search, setSearch] = useState("");

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