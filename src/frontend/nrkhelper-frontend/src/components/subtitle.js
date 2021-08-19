const Subtitle = ({text, onClick = () => {} }) => {
    return <button onClick={onClick}> {text} </button>;
}

export default Subtitle;