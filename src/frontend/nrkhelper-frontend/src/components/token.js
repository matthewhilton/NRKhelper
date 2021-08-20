import { Card } from "react-bootstrap"

const Token = ({token, lemma, pos, morph}) => {
    if(pos === "PUNCT") return null;

    return (
        <Card style={{width: 150, height: 150}}>
            <Card.Title>
                {token} 
            </Card.Title>
            
            <Card.Body>
                <span class="badge text-white" style={{backgroundColor: "#00c298"}}> {pos} </span>
                
                <span class="badge text-white" style={{backgroundColor: "#0088c2"}}> {lemma} </span>
                {morph.Gender ? <span class="badge text-white" style={{backgroundColor: "#3e009c"}}> {morph.Gender} </span> : null}
                {morph.PronType ? <span class="badge text-white" style={{backgroundColor: "#5a0180"}}> {morph.PronType} </span> : null}
                {morph.VerbForm ? <span class="badge text-white" style={{backgroundColor: "#710180"}}> {morph.VerbForm} </span> : null}
                {morph.Tense ? <span class="badge text-white" style={{backgroundColor: "#800171"}}> {morph.Tense} </span> : null}
            </Card.Body>
        </Card>
    )
}

export default Token;