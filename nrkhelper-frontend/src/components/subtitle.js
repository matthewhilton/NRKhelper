import { Button } from 'react-bootstrap'

const Subtitle = ({text, onClick = () => {} }) => {
    return <Button variant="light" onClick={() => onClick(text)} style={{margin: 2, maxHeight: 40}}> {text} </Button>;
}

export default Subtitle;