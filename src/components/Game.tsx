'use client';

import { FC, useRef, useState } from 'react';

import { GameBoard, GameBoardMethods } from './GameBoard';
import { GameState } from '@/lib/types';

export const START_DELAY = 1000 * 3;

const Game: FC = ({}) => {
  const ref = useRef<GameBoardMethods>(null);
  const [gameState, setGameState] = useState(GameState.New);
  const [points, setPoints] = useState(0);
  const [rotationDirection, setRotationDirection] = useState(false);

  const clickHandler = () => {
    switch (gameState) {
      case GameState.New:
        setGameState(GameState.Starting);
        setTimeout(() => setGameState(GameState.Started), START_DELAY);
        break;

      case GameState.Started:
        if (ref.current?.isOverlap()) {
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
        setPoints(0);
        setGameState(GameState.New);
        break;
    }
  };

  return (
    <>
      <GameBoard
        ref={ref}
        gameState={gameState}
        points={points}
        rotationDirection={rotationDirection}
      />
      <button
        className="absolute inset-0 z-50 w-full h-full"
        onClick={clickHandler}
      />
    </>
  );
};

export default Game;
