const ContextItem = ({items, target, word}) => {

    const sentence = items.tokens.map((token, index) => {
        
        if(items.lemma[index] === target || items.tokens[index] === word) return <span class="badge text-white" style={{backgroundColor: "#bf6230", margin: 3}}> {token} </span>
        
        return `${token} `
    })
    return <p> {sentence} </p>
}

export default ContextItem;