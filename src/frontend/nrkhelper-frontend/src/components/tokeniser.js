import useSWR from "swr";
import Token from "./token";

const Tokeniser = ({text}) => {
    
    const { data, error } = useSWR(`http://localhost:3000/tokenise?sentence="${text}"`, { refreshInterval: 0 })

    if(!data) {
        return null;
    }

    const tokens = data.tokens;
    const lemmas = data.lemma;
    const pos = data.pos;
    const morphology = data.morph;

    const tokenElements = tokens.map((token, index) => <Token token={token} lemma={lemmas[index]} pos={pos[index]} morph={morphology[index]} />)

    return <div style={{display: "flex", flexWrap: "wrap"}}>
        {tokenElements}
    </div>;
}

export default Tokeniser;