import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";
import {apiUrl} from "../apiurl"

const Translator = ({text}) => {
    const [translation, setTranslation] = useState(null);

    const translate = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        };
        fetch(`${apiUrl}/translate`, requestOptions)
            .then(response => response.json())
            .then(data => setTranslation(data.translation));
    }

    return (
        <div style={{marginTop: 10, marginBottom: 10}}>
            <InputGroup>
                <FormControl value={text} disabled/>
                <Button onClick={() => translate()}> Translate </Button>
            </InputGroup>

            {translation && 
                <div style={{color: "black", marginTop: 20}}>
                    <h3> Translation: </h3>
                    <p> {translation} </p>
                </div>
            }
        </div>
    )
}

export default Translator;