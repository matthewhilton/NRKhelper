import { useState } from "react";
import { Button, FormControl, InputGroup } from "react-bootstrap";

const Translator = ({text}) => {
    const [translation, setTranslation] = useState(null);

    const translate = () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: text })
        };
        fetch(`${process.env.REACT_APP_API_ENDPOINT}/translate`, requestOptions)
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
                <div>
                    <h3> Translation: </h3>
                    <p> {translation} </p>
                </div>
            }
        </div>
    )
}

export default Translator;