import { useState } from "react";
import { Card, Button, FormControl, InputGroup } from "react-bootstrap";
import useSWR from 'swr'

const VideoSelector = ({ onProgramId = () => {}}) => {
    const [search, setSearch] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);

    const { data, error } = useSWR(`http://localhost:3000/programid?url=${searchQuery}`, { refreshInterval: 0 })
    const loading = !data && !error;

    if(data && data.programid) {
        onProgramId(data.programid)
    }

    
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                Video Url
                </Card.Title>

                <InputGroup>
                    <FormControl value={search} onChange={(e) => setSearch(e.target.value)} />
                    <Button onClick={() => setSearchQuery(search)}> Search </Button>
                </InputGroup>

            { loading && "Loading" }
            { data && <b> Program ID: {data.programid} </b>}
            
            </Card.Body>
        </Card>
    )
}

export default VideoSelector;