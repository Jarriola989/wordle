export const MAX_WORD_LENGTH = 5;
export const MAX_GUESS_ATTEMPTS = 6;

export const KeyStates = {
    UNSELECTED: null,
    NO_MATCH: 'rgb(58,58,60)',
    EXACT_MATCH: 'rgb(97,139,85)', // in word and correct spot
    CLOSE_MATCH: 'rgb(177,159,76)', // in word, incorrect spot
}

// will prevent unwanted transitions, such as going from exact match (green), to close match (yellow)
export const LetterAllowedStateTransitions = [
    (KeyStates.UNSELECTED, KeyStates.NO_MATCH),
    (KeyStates.UNSELECTED, KeyStates.CLOSE_MATCH),
    (KeyStates.UNSELECTED, KeyStates.EXACT_MATCH),
    (KeyStates.CLOSE_MATCH, KeyStates.EXACT_MATCH),
]

export class LetterGuess {
    constructor(letter = null, state = KeyStates.UNSELECTED) {
        this.letter = letter;
        this.state = state;
    }
}

export const emptyGuessBoxes = new Array(MAX_GUESS_ATTEMPTS).fill([...Array(MAX_WORD_LENGTH).fill(new LetterGuess())]);