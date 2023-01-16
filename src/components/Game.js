import React, { useState, useEffect } from 'react';
import WordGuesses from './WordGuesses';
import Keyboard from './Keyboard';
import GameResult from './GameResult';
import { emptyGuessBoxes, 
    LetterGuess,
    KeyStates,
    isLetterStateUpdateAllowed,
    keyboard,
    MAX_WORD_LENGTH,
    GAME_ID,
    PLAYER_DATA,
    DAILY_MS,
    RandomWordGeneratorAPI, 
    MAX_GUESS_ATTEMPTS} from '../common'

const Game = () => {
    const [state, setState] = useState(
        {currentGuess: [],
        attempts: emptyGuessBoxes,
        currentAttempt: 1, // up to 6 attempts
        keyboard: keyboard,
        isGameWon: false,
        isGameLost: false});
    const [wordle, setWordle] = useState("");
    const [errorMsg, setErrorMsg] = useState("");

    useEffect(() => {
        if (localStorage.getItem(PLAYER_DATA)) setState(JSON.parse(localStorage.getItem(PLAYER_DATA)));

        if(!localStorage.getItem(GAME_ID)){ // user can clear browser cache + refresh to restart game for testing purposes
            restartGame();
        } else {
            setWordle(localStorage.getItem(GAME_ID));

            const interval = setInterval(() => {
                restartGame();
            }, DAILY_MS);
            return () => clearInterval(interval);
        }
    }, [])

    const restartGame = () => {
        const endpoint = `${RandomWordGeneratorAPI}?length=5`;
        fetch(endpoint).then(data => data.json()).then(res => {
            localStorage.setItem(GAME_ID, res[0])
            setWordle(res[0]);
            resetPlayerProgress()});
    }

    const resetPlayerProgress = () => {
        const resetState = {currentGuess: [],
            attempts: emptyGuessBoxes,
            currentAttempt: 1,
            keyboard: keyboard,
            isGameWon: false}
        setState(resetState)
        localStorage.setItem(PLAYER_DATA, JSON.stringify(resetState))
    }
    

    const addLetter = (letter) => {
        const {currentGuess, attempts, currentAttempt} = state;
        if (currentGuess.length < MAX_WORD_LENGTH) {
            const updatedGuesses = JSON.parse(JSON.stringify(attempts));
            updatedGuesses[currentAttempt-1][currentGuess.length] = new LetterGuess(letter);
            setState({...state, currentGuess: [...currentGuess, letter], attempts: updatedGuesses});
        }
    }

    const updateLetterState = (letter, newState) => {
        if(isLetterStateUpdateAllowed(letter.state, newState)) {
            letter.state = newState;
        }
    }

    const updateKeyboard = (letter, keyboard, newState) => {
        if(isLetterStateUpdateAllowed(keyboard[letter], newState)) {
            keyboard[letter] = newState;
        }
    }

    const removeLetter = () => {
        const {currentGuess, attempts, currentAttempt} = state;
        if (currentGuess.length > 0) {
            const updatedGuess = [...currentGuess];
            const updatedGuesses = JSON.parse(JSON.stringify(attempts));
            
            updatedGuesses[currentAttempt-1][currentGuess.length-1] = new LetterGuess();
            updatedGuess.pop();
            setState({...state, currentGuess: updatedGuess, attempts: updatedGuesses});
        }
    }

    const submitGuess = () => {
        const {currentGuess, attempts, currentAttempt, keyboard} = state;
        const existingLetters = new Set(wordle.split(''));

        if(currentGuess.length < 5) {
            setErrorMsg("Not enough letters")
        } else if (false) { // TODO: change condition for spellcheck/invalid word (webpack issue)
            // SpellChecker.getDictionary("en-US", (err, dict) => {
            //     if(!err) {
            //         const mispelled = !dict.spellCheck(state.currentWord.join(''));
            //     }
            // })
            setErrorMsg("Not in word list")
        } else {
            let updatedGuesses = JSON.parse(JSON.stringify(attempts));;
            let updatedKeyboard = {...keyboard};

            currentGuess.forEach((letter, i) => {
                if(letter.toLowerCase() === wordle.charAt(i)) {
                    updateLetterState(updatedGuesses[currentAttempt-1][i], KeyStates.EXACT_MATCH)
                    updateKeyboard(letter, updatedKeyboard, KeyStates.EXACT_MATCH)
                } else if(existingLetters.has(letter.toLowerCase())) {
                    updateLetterState(updatedGuesses[currentAttempt-1][i], KeyStates.CLOSE_MATCH)
                    updateKeyboard(letter, updatedKeyboard, KeyStates.CLOSE_MATCH)
                } else {
                    updateLetterState(updatedGuesses[currentAttempt-1][i], KeyStates.NO_MATCH)
                    updateKeyboard(letter, updatedKeyboard, KeyStates.NO_MATCH)
                }
            });

            let updatedGameWon = currentGuess.join('').toLowerCase() === wordle.toLowerCase();
            let updatedGameLost = currentAttempt === MAX_GUESS_ATTEMPTS && !updatedGameWon ? true : false;
            const updatedState = {...state, 
                currentGuess: [], 
                attempts: updatedGuesses, 
                currentAttempt: currentAttempt+1, 
                keyboard: updatedKeyboard,
                isGameWon: updatedGameWon,
                isGameLost: updatedGameLost
            }
            localStorage.setItem(PLAYER_DATA, JSON.stringify(updatedState))
            setState(updatedState)
        }
    }

    const clearErrorMsg = () => {
        setTimeout(() => setErrorMsg(""), 1000)
    }

    return(
        <div className="game">
            {state.isGameWon || state.isGameLost ? <GameResult wordle={wordle} gameWon={state.isGameWon} /> : null}
            <WordGuesses attempts={state.attempts} errorMsg={errorMsg} clearErrorMsg={clearErrorMsg} currentAttemptNum={state.currentAttempt}/>
            <Keyboard addLetter={addLetter} keyboard={state.keyboard} />
            <div className="buttons">
                <button className="delete" onClick={() => removeLetter()}>Delete</button>
                <button className="submit" onClick={() => submitGuess()}>Submit</button>
            </div>
        </div>
    )
}

export default Game;