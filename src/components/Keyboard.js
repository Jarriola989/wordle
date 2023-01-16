import React from 'react';
import {KeyStates, LetterGuess} from '../common'

const Keyboard = (props) => {
    const lineBreakLetters = ["A", "Z"]
    const keyboard = [
        new LetterGuess('Q', KeyStates.UNSELECTED), 
        new LetterGuess('W', KeyStates.UNSELECTED), 
        new LetterGuess('E', KeyStates.UNSELECTED), 
        new LetterGuess('R', KeyStates.UNSELECTED),
        new LetterGuess('T', KeyStates.UNSELECTED), 
        new LetterGuess('Y', KeyStates.UNSELECTED),
        new LetterGuess('U', KeyStates.UNSELECTED),
        new LetterGuess('I', KeyStates.UNSELECTED),
        new LetterGuess('O', KeyStates.UNSELECTED),
        new LetterGuess('P', KeyStates.UNSELECTED),
        new LetterGuess('A', KeyStates.UNSELECTED),
        new LetterGuess('S', KeyStates.UNSELECTED),
        new LetterGuess('D', KeyStates.UNSELECTED),
        new LetterGuess('F', KeyStates.UNSELECTED),
        new LetterGuess('G', KeyStates.UNSELECTED),
        new LetterGuess('H', KeyStates.UNSELECTED),
        new LetterGuess('J', KeyStates.UNSELECTED),
        new LetterGuess('K', KeyStates.UNSELECTED),
        new LetterGuess('L', KeyStates.UNSELECTED),
        new LetterGuess('Z', KeyStates.UNSELECTED),
        new LetterGuess('X', KeyStates.UNSELECTED),
        new LetterGuess('C', KeyStates.UNSELECTED),
        new LetterGuess('V', KeyStates.UNSELECTED),
        new LetterGuess('B', KeyStates.UNSELECTED),
        new LetterGuess('N', KeyStates.UNSELECTED), 
        new LetterGuess('M', KeyStates.UNSELECTED)
    ]
    const requiresLineBreak = (letter) => lineBreakLetters.includes(letter);

    return(
        <div className="keys">
            {keyboard.map(({letter, state}) => 
                <div key={letter} className={`key ${requiresLineBreak(letter) ? "key-break" : ""}`} style={{backgroundColor: state}} onClick={(() => props.addLetter(letter))}>{letter}</div>)}
        </div>)
}

export default Keyboard;