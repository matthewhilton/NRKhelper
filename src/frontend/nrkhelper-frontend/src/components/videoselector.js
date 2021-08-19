import { useState } from "react";
import useSWR from 'swr'

const VideoSelector = ({ onProgramId = () => {}}) => {
    const [search, setSearch] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);

    const { data, error } = useSWR(`http://localhost:3000/programid?url=${searchQuery}`, { refreshInterval: 0 })

    if(data && data.programid) {
        onProgramId(data.programid)
    }
    
    return (
        <div>
             <h2> Video Url: </h2>
            <input value={search} onChange={(e) => setSearch(e.target.value)}/>
            <button onClick={() => setSearchQuery(search)}> Search </button>

            { data && <b> Program ID: {data.programid} </b>}
        </div>
    )
}

export default VideoSelector;