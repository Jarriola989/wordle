import React from 'react';

const Keyboard = ({addLetter, keyboard}) => {
    const lineBreakLetters = ["A", "Z"]
    const requiresLineBreak = (letter) => lineBreakLetters.includes(letter);

    return(
        <div className="keys">
            {Object.keys(keyboard).map(letter => 
                <div key={letter} className={`key ${requiresLineBreak(letter) ? "key-break" : ""}`} style={{backgroundColor: keyboard[letter]}} onClick={(() => addLetter(letter))}>{letter}</div>)}
        </div>)
}

export default Keyboard;