import useSWR from "swr";
import Token from "./token";
import { Card, CardGroup } from "react-bootstrap"

const Tokeniser = ({text, onTokenClicked = () => {}}) => {
    
    const { data, error } = useSWR(`http://localhost:3000/tokenise?sentence="${text}"`, { refreshInterval: 0 })

    if(!data) {
        return null;
    }

    const tokens = data.tokens;
    const lemmas = data.lemma;
    const pos = data.pos;
    const morphology = data.morph;

    // Remove PUNCT (punctuation) tokens.
    const tokenElements = tokens.map((token, index) => <a onClick={() => onTokenClicked(token)}>
        <Token token={token} lemma={lemmas[index]} pos={pos[index]} morph={morphology[index]} />
    </a>)

    return (
        <Card> 
            
            <Card.Body>

            <Card.Title>
                Sentence Tokens
            </Card.Title>

               <CardGroup>
                {tokenElements}
                </CardGroup>
            
            </Card.Body>
        </Card>
    )
}

export default Tokeniser;