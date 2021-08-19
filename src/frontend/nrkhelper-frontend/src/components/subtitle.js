const Subtitle = ({text, onClick = () => {} }) => {
    return <button onClick={() => onClick(text)}> {text} </button>;
}

export default Subtitle;