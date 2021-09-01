import useSWR from "swr";
import Token from "./token";
import { Card, CardGroup } from "react-bootstrap"
import {apiUrl} from "../apiurl"

const Tokeniser = ({text, onTokenClicked = () => {}}) => {
    
    return (
        <div>
            <TokenLegend />
            {text ? <TokenGroup text={text} onTokenClicked={onTokenClicked}/> : "No Sentence" }
        </div>
    )
}

const TokenGroup = ({text, onTokenClicked = () => {}}) => {
    const { data, error } = useSWR(`${apiUrl}/tokenise?sentence="${text}"`, { refreshInterval: 0 })
    const loading = !data && !error;

    if(loading) {
        return "Loading...";
    }

    if(!data) {
        return null;
    }

    const tokens = data.tokens;
    const lemmas = data.lemma;
    const pos = data.pos;
    const morphology = data.morph;
    
    const tokenElements = tokens.map((token, index) => <a onClick={() => onTokenClicked(token)}>
        <Token token={token} lemma={lemmas[index]} pos={pos[index]} morph={morphology[index]} />
    </a>)

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