export const GAME_ID = "WORDLE"
export const PLAYER_DATA = "WORDLE_DATA"
export const MAX_WORD_LENGTH = 5;
export const MAX_GUESS_ATTEMPTS = 6;
export const DAILY_MS = 8.64e+7;
export const RandomWordGeneratorAPI = "https://random-word-api.herokuapp.com/word";

export const KeyStates = {
    UNSELECTED: null,
    NO_MATCH: 'rgb(58,58,60)',
    EXACT_MATCH: 'rgb(97,139,85)', // in word and correct spot
    CLOSE_MATCH: 'rgb(177,159,76)', // in word, incorrect spot
}

// will prevent unwanted transitions, such as going from exact match (green), to close match (yellow)
const LetterAllowedStateTransitions = [
    [KeyStates.UNSELECTED, KeyStates.NO_MATCH],
    [KeyStates.UNSELECTED, KeyStates.CLOSE_MATCH],
    [KeyStates.UNSELECTED, KeyStates.EXACT_MATCH],
    [KeyStates.CLOSE_MATCH, KeyStates.EXACT_MATCH],
]

export const isLetterStateUpdateAllowed = (prevState, updatedState) => LetterAllowedStateTransitions.some(([prev, updated]) => prev === prevState && updated === updatedState);

export class LetterGuess {
    constructor(letter = null, state = KeyStates.UNSELECTED) {
        this.letter = letter;
        this.state = state;
    }
}

export const emptyGuessBoxes = new Array(MAX_GUESS_ATTEMPTS).fill([...Array(MAX_WORD_LENGTH).fill(new LetterGuess())]);

export const keyboard = {
    'Q': KeyStates.UNSELECTED, 
    'W': KeyStates.UNSELECTED, 
    'E': KeyStates.UNSELECTED, 
    'R': KeyStates.UNSELECTED,
    'T': KeyStates.UNSELECTED, 
    'Y': KeyStates.UNSELECTED,
    'U': KeyStates.UNSELECTED,
    'I': KeyStates.UNSELECTED,
    'O': KeyStates.UNSELECTED,
    'P': KeyStates.UNSELECTED,
    'A': KeyStates.UNSELECTED,
    'S': KeyStates.UNSELECTED,
    'D': KeyStates.UNSELECTED,
    'F': KeyStates.UNSELECTED,
    'G': KeyStates.UNSELECTED,
    'H': KeyStates.UNSELECTED,
    'J': KeyStates.UNSELECTED,
    'K': KeyStates.UNSELECTED,
    'L': KeyStates.UNSELECTED,
    'Z': KeyStates.UNSELECTED,
    'X': KeyStates.UNSELECTED,
    'C': KeyStates.UNSELECTED,
    'V': KeyStates.UNSELECTED,
    'B': KeyStates.UNSELECTED,
    'N': KeyStates.UNSELECTED, 
    'M': KeyStates.UNSELECTED
}