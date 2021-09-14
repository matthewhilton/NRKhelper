import Token from "./token";
import { Button, CardGroup } from "react-bootstrap"

const Tokeniser = ({text, onTokenClicked = () => {}, analysis}) => {
    console.log(analysis)
    return (
        <div>
            <TokenLegend />
            {text ? <TokenGroup text={text} onTokenClicked={onTokenClicked} analysis={analysis}/> : "No Sentence" }
        </div>
    )
}

const TokenGroup = ({text, onTokenClicked = () => {}, analysis}) => {
    const data = analysis.find(item => item.raw === text)

    const tokens = data.tokens;
    const lemmas = data.lemma;
    const pos = data.pos;
    const morphology = data.morph;

    const tokenElements = tokens.map((token, index) => pos[index] !== "PUNCT" && pos[index] !== "SPACE" ?
        <Button variant="light" onClick={() => onTokenClicked(token)}>
            <Token token={token} lemma={lemmas[index]} pos={pos[index]} morph={morphology[index]} />
        </Button> : 
        null)

    return <CardGroup> {tokenElements} </CardGroup>
}

const TokenLegend = () => (
    <div style={{margin: 10}}>
        <span class="badge text-white" style={{backgroundColor: "#00c298"}}> Part of Speech </span>     
        <span class="badge text-white" style={{backgroundColor: "#0088c2"}}> Lemma </span>
        <span class="badge text-white" style={{backgroundColor: "#3e009c"}}> Gender </span>
        <span class="badge text-white" style={{backgroundColor: "#5a0180"}}> Pronoun Type </span>
        <span class="badge text-white" style={{backgroundColor: "#710180"}}> Verb Form </span>
        <span class="badge text-white" style={{backgroundColor: "#800171"}}> Tense </span>
    </div>
)

export default Tokeniser;