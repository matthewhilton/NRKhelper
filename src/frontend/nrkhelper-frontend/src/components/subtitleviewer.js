import { useState } from "react";
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
        <div>
            <h1> Subtitles </h1>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <h2> {subtitleElements} </h2>
        </div>
    )
}

export default SubtitleViewer;