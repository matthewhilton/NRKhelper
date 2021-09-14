import { useState } from "react";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import {apiUrl} from "../apiurl"

const VideoSelector = ({ onVideo = () => {}}) => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
 
    const searchVideo = () => {
        setLoading(true);
        setError(null);

        fetch(`${apiUrl}/programid?url=${search}`)
        .then(res => res.json())
        .then(data => {
            onVideo(data)
            setLoading(false)
        })
        .catch(e => {
            setLoading(false)
            setError("Error getting ProgramID")
        })
    }

    return (
        <Card className="bg-dark">
            <Card.Body>
                <Card.Title>
                Video Url
                </Card.Title>               

                <InputGroup>
                    <FormControl value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button onClick={() => searchVideo()}> Search </Button>
                </InputGroup>

                <br />
                {loading && <Card.Subtitle> Loading... </Card.Subtitle> }
                {error && <Card.Subtitle> {error} </Card.Subtitle> }

            </Card.Body>
        </Card>
    )
}

export default VideoSelector;