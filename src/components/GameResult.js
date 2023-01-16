import React from 'react';

const GameResult = ({wordle, gameWon}) => {
    return (
        <div className="backdrop">
            <div className="game-result">
                <h3>{gameWon ? "You Won!" : "You Lost..."}</h3>
                <h4>You {gameWon ? "guessed": "didn't guess"} the wordle of the day: <>{wordle.toUpperCase()}</></h4>
                <p>Please come back to play tomorrow for a new wordle!</p>
            </div>
        </div>
    );
}

export default GameResult;