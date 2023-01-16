import React, { useState, useEffect } from 'react';
// import SpellChecker from 'simple-spellchecker';
// import SpellChecker from 'spellchecker';
import WordGuesses from './WordGuesses'
import Keyboard from './Keyboard'
import { emptyGuessBoxes, LetterGuess, KeyStates, LetterAllowedStateTransitions } from '../common'

const Game = () => {
    // const SpellChecker = require('simple-spellchecker');
    const MAX_WORD_LENGTH = 5;
    
    const randomWordGeneratorAPI = "https://random-word-api.herokuapp.com/word";
  
    const [state, setState] = useState(
        {currentGuess: [],
        attempts: emptyGuessBoxes,
        currentAttempt: 1}); // up to 6 attempts
    const [wordle, setWordle] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        const endpoint = `${randomWordGeneratorAPI}?length=5`;
        fetch(endpoint).then(data => data.json()).then(res => setWordle(res[0]))
    }, [])

    const addLetter = (letter) => {
        const {currentGuess, attempts, currentAttempt} = state;
        if (currentGuess.length < MAX_WORD_LENGTH) {
            const updatedGuesses = JSON.parse(JSON.stringify(attempts))
            updatedGuesses[currentAttempt-1][currentGuess.length] = new LetterGuess(letter);
            setState({...state, currentGuess: [...currentGuess, letter], attempts: updatedGuesses});
        }
    }

    const updateLetterState = (letter, newState) => {
        if(LetterAllowedStateTransitions.includes((letter.state, newState))) {
            letter.state = newState;
        }
    }

    const removeLetter = () => {
        
    }

    const submitGuess = () => {
        const {currentGuess, attempts, currentAttempt} = state;
        const existingLetters = new Set(wordle.split(''));

        if(currentGuess.length < 5) {
            setErrorMsg("Not enough letters")
        } else if (currentGuess === null) { // TODO: change condition for spellcheck/invalid word
            // SpellChecker.getDictionary("en-US", (err, dict) => {
            //     if(!err) {
            //         const mispelled = !dict.spellCheck(state.currentWord.join(''))
            //     }
            // })
            setErrorMsg("Not in word list")
        } else {
            console.log("curr word is", wordle, currentGuess)
            let updatedGuesses = [...attempts];
            currentGuess.map((letter, i) => {
                if(letter.toLowerCase() === wordle.charAt(i)) {
                    updateLetterState(updatedGuesses[currentAttempt-1][i], KeyStates.EXACT_MATCH)
                    // todo: check if letter was exact match in previous/future index or previous attempt
                } else if(existingLetters.has(letter.toLowerCase())) {
                    updateLetterState(updatedGuesses[currentAttempt-1][i], KeyStates.CLOSE_MATCH)
                } else {
                    updateLetterState(updatedGuesses[currentAttempt-1][i], KeyStates.NO_MATCH)
                }
            });
            setState({...state, currentGuess: [], attempts: updatedGuesses, currentAttempt: currentAttempt+1})
        }
   
    }


    return(
        <div className="game">
            <WordGuesses currentWord={state.currentWord} attempts={state.attempts} currentAttempt={state.currentAttempt}/>
            <Keyboard addLetter={addLetter}/>
            <div className="buttons">
                <button className="delete">Delete</button>
                <button className="submit" onClick={() => submitGuess()}>Submit</button>
            </div>
        </div>
    )
}

export default Game;