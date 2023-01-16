import React from 'react';

const WordGuesses = ({attempts, errorMsg, clearErrorMsg, currentAttemptNum}) => {

    const returnErrorMsg = (attemptIndex) => {
        if (currentAttemptNum-1 === attemptIndex && errorMsg) {
            clearErrorMsg()
            return <div className="error-msg">{errorMsg}</div>;
        }
    }
    
    return(
        <div>
            {attempts.map((guess, i) => 
                <div key={i+1} className="guess-boxes">
                    {returnErrorMsg(i)}
                    {guess.map((box, j) => 
                        <div key={`${i+1}-${j}`} className="guess-box" style={{backgroundColor: box.state}}>{box.letter ? box.letter : <>&nbsp;</>}</div>)}
                </div>)}
        </div>
    )
}

export default WordGuesses;