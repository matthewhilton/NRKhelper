import { useState } from "react";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import useSWR from 'swr'
import {apiUrl} from "../apiurl"

const VideoSelector = ({ onVideo = () => {}}) => {
    const [search, setSearch] = useState("");
    const [loading, setLoading] = useState(false);
 
    const searchVideo = () => {
        setLoading(true);

        fetch(`${apiUrl}/programid?url=${search}`)
        .then(res => res.json())
        .then(data => {
            onVideo(data)
            setLoading(false)
        })
        .catch(e => setLoading(false))
    }

    return (
        <Card className="bg-dark">
            <Card.Body>
                <Card.Title>
                Video Url
                </Card.Title>

                {loading && <Card.Subtitle> Loading... </Card.Subtitle> }

                <InputGroup>
                    <FormControl value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button onClick={() => searchVideo()}> Search </Button>
                </InputGroup>
            </Card.Body>
        </Card>
    )
}

export default VideoSelector;