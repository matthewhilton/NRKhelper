import { useState } from "react";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import useSWR from 'swr'

const VideoSelector = ({ onProgramId = () => {}}) => {
    const [search, setSearch] = useState(null);

    const searchVideo = () => {
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/programid?url=${search}`)
        .then(res => res.json())
        .then(data => onProgramId(data.programid))
    }

    
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                Video Url
                </Card.Title>

                <InputGroup>
                    <FormControl value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button onClick={() => searchVideo()}> Search </Button>
                </InputGroup>
            </Card.Body>
        </Card>
    )
}

export default VideoSelector;