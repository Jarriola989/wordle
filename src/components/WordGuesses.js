import React, { useEffect } from 'react';

const WordGuesses = ({currentWord, attempts, currentAttempt}) => {

    console.log("guesses", attempts)
    // useEffect(() => {

    // }, [currentGuesses]);
    
    return(
        <div>
            {attempts.map((guess, i) => 
                <div key={i+1} className="guess-boxes">
                    {guess.map((box, j) => 
                        <div key={`${i+1}-${j}`} className="guess-box" style={{backgroundColor: box.state}}>{box.letter ? box.letter : <>&nbsp;</>}</div>)}
                </div>)}
        </div>
    )
}

export default WordGuesses;