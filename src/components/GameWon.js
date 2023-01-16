import React from 'react';

const GameWon = ({wordle}) => {
    return (
        <div className="backdrop">
            <div className="game-won">
                <h3>You Won!</h3>
                <h4>You guessed the wordle of the day: <>{wordle.toUpperCase()}</></h4>
                <p>Please come back to play tomorrow for a new wordle!</p>
            </div>
        </div>
    );
}

export default GameWon;