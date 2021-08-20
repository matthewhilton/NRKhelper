import { useState } from "react";
import { Card } from "react-bootstrap";
import useSWR from 'swr'

const VideoSelector = ({ onProgramId = () => {}}) => {
    const [search, setSearch] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);

    const { data, error } = useSWR(`http://localhost:3000/programid?url=${searchQuery}`, { refreshInterval: 0 })

    if(data && data.programid) {
        onProgramId(data.programid)
    }
    
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                Video Url
                </Card.Title>

                <input value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={() => setSearchQuery(search)}> Search </button>

            { data && <b> Program ID: {data.programid} </b>}
            
            </Card.Body>
        </Card>
    )
}

export default VideoSelector;