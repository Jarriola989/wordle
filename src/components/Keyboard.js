import React from 'react';
import {KeyStates, LetterGuess} from '../common'

const Keyboard = ({addLetter, keyboard}) => {
    const lineBreakLetters = ["A", "Z"]
    // const keyboard = {
    //     'Q': KeyStates.UNSELECTED, 
    //     'W': KeyStates.UNSELECTED, 
    //     'E': KeyStates.UNSELECTED, 
    //     'R': KeyStates.UNSELECTED,
    //     'T': KeyStates.UNSELECTED, 
    //     'Y': KeyStates.UNSELECTED,
    //     'U': KeyStates.UNSELECTED,
    //     'I': KeyStates.UNSELECTED,
    //     'O': KeyStates.UNSELECTED,
    //     'P': KeyStates.UNSELECTED,
    //     'A': KeyStates.UNSELECTED,
    //     'S': KeyStates.UNSELECTED,
    //     'D': KeyStates.UNSELECTED,
    //     'F': KeyStates.UNSELECTED,
    //     'G': KeyStates.UNSELECTED,
    //     'H': KeyStates.UNSELECTED,
    //     'J': KeyStates.UNSELECTED,
    //     'K': KeyStates.UNSELECTED,
    //     'L': KeyStates.UNSELECTED,
    //     'Z': KeyStates.UNSELECTED,
    //     'X': KeyStates.UNSELECTED,
    //     'C': KeyStates.UNSELECTED,
    //     'V': KeyStates.UNSELECTED,
    //     'B': KeyStates.UNSELECTED,
    //     'N': KeyStates.UNSELECTED, 
    //     'M': KeyStates.UNSELECTED
    // }
    const requiresLineBreak = (letter) => lineBreakLetters.includes(letter);

    return(
        <div className="keys">
            {Object.keys(keyboard).map(letter => 
                <div key={letter} className={`key ${requiresLineBreak(letter) ? "key-break" : ""}`} style={{backgroundColor: keyboard[letter]}} onClick={(() => addLetter(letter))}>{letter}</div>)}
        </div>)
}

export default Keyboard;