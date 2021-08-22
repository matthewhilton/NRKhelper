const ContextItem = ({items, target}) => {

    const sentence = items.tokens.map((token, index) => {
        
        if(items.lemma[index] === target) return <span class="badge text-white" style={{backgroundColor: "#bf6230", margin: 3}}> {token} </span>
        
        return `${token} `
    })
    return <p> {sentence} </p>
}

export default ContextItem;