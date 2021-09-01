import { Card, Button, Badge, ListGroup } from "react-bootstrap";
import useSWR from "swr"
import ContextItem from "./contextitem";
import {apiUrl} from "../apiurl"

const Contextualiser = ({programid, word}) => {
    return (
        <Card>
            <Card.Body>
                <Card.Title>
                    Context
                </Card.Title>
                {programid !== null && word !== null ?  <ContextDisplay programid={programid} word={word}/> : "No token selected."}
            </Card.Body>
        </Card>
    )
}

const ContextDisplay = ({programid, word}) => {
    const { data, error } = useSWR(`${apiUrl}/context?word=${word}&programid=${programid}`, { refreshInterval: 0 })
    const loading = !data && !error;

    if(loading) return "Loading...";

    if(!data) return null;

    const translation = data.translation
    const context_sentencs = data.context.map((item) => <ListGroup.Item> <ContextItem items={item} target={data.word_lemma} /> </ListGroup.Item>)

    return(
        <div>
            <p style={{fontSize: '30px', textAlign: "center"}}> <span class="badge text-white" style={{backgroundColor: "#bf6230"}}> (NO) {word} </span> <span class="badge text-white" style={{backgroundColor: "#bf4830"}}> (EN) {translation} </span> </p>
            
            <b> Word found in other sentences: </b>
            <ListGroup>
                {context_sentencs}
            </ListGroup>
        </div>
    )
}

export default Contextualiser;