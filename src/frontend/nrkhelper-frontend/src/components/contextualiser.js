import { Card, Button } from "react-bootstrap";

const Contextualiser = ({programid, word}) => {
    
    return (
        <Card>
            
            <Card.Body>

            <Card.Title>
                Context
            </Card.Title>
            
            <b> {word} </b>

            <div style={{flex: 1, flexDirection: "row"}}>
                <Button style={{margin: 5}}> Translate </Button>
                <Button style={{margin: 5}}> Find in other sentences </Button>  
            </div>
            </Card.Body>
        </Card>
    )
}

export default Contextualiser;