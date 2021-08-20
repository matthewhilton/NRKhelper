import { useState } from "react";
import { CardGroup, Card } from "react-bootstrap";
import useSWR from "swr";
import Subtitle from "./subtitle";

const SubtitleViewer = ({programId, onSubtitleClicked = () => {}}) => {
    const [search, setSearch] = useState(null);

    const { data, error } = useSWR(`http://localhost:3000/subtitles?programid=${programId}`, { refreshInterval: 0 })

    if(!data) {
        return null;
    }

    const subtitles = data.subtitles;
    const filteredElements = (search != null && search != "") ? data.subtitles.filter(subtitle => subtitle.includes(search)) : subtitles;
    const subtitleElements = filteredElements.map(subtitle => <Subtitle text={subtitle} onClick={(item) => onSubtitleClicked(item)}/>);

    return(
        <Card>
            <Card.Body>
                <Card.Title>
                    Subtitles
                </Card.Title>
                <CardGroup>
                    {subtitleElements}
                </CardGroup>
            </Card.Body>
        </Card>
    )
}

export default SubtitleViewer;