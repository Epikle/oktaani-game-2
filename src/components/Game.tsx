'use client';

import { FC, useState } from 'react';
import GameBoard from './GameBoard';

export enum GameState {
  New = 'NEW',
  Starting = 'STARTING',
  Started = 'STARTED',
  Ended = 'ENDED',
}

export const START_DELAY = 1000 * 3;

const Game: FC = ({}) => {
  const [gameState, setGameState] = useState(GameState.New);
  const [points, setPoints] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(false);
  const [isOverlap, setIsOverlap] = useState(false);

  const clickHandler = () => {
    switch (gameState) {
      case GameState.New:
        setGameState(GameState.Starting);
        setTimeout(() => setGameState(GameState.Started), START_DELAY);
        break;

      case GameState.Started:
        if (isOverlap) {
          setPoints((prevS) => ++prevS);
          setRotationDirection((prevS) => !prevS);
        } else {
          setGameState(GameState.Ended);
        }
        break;

      case GameState.Ended:
        setPoints(0);
        setGameState(GameState.Starting);
        setTimeout(() => setGameState(GameState.Started), START_DELAY);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <GameBoard
        gameState={gameState}
        points={points}
        rotationDirection={rotationDirection}
        onOverlap={setIsOverlap}
      />
      <button className="absolute inset-0 z-50" onClick={clickHandler} />
    </>
  );
};

export default Game;
