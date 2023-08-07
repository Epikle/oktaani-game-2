'use client';

import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { Pointer } from 'lucide-react';

import { START_DELAY } from './Game';
import {
  GameBoardBg,
  GameBoardBgCenter,
  GameBoardBgCenterText,
} from './GameBoardBg';
import { Needle } from './Needle';
import { GameState } from '@/lib/types';
import { useOverlap } from '@/hooks/useOverlap';
import { Target, TargetDemo } from './Target';

interface GameBoardProps {
  gameState: GameState;
  points: number;
  rotationDirection: boolean;
}

export interface GameBoardMethods {
  isOverlap: () => boolean;
}

export const GameBoard = forwardRef<GameBoardMethods, GameBoardProps>(
  ({ gameState, points, rotationDirection }, ref) => {
    let timer: NodeJS.Timer | undefined;
    const needleRef = useRef<HTMLDivElement>(null);
    const targetRef = useRef<HTMLDivElement>(null);
    const [startTime, setStartTime] = useState(START_DELAY);
    const [targetDeg, setTargetDeg] = useState(45);
    const isOverlapping = useOverlap(needleRef, targetRef);

    useImperativeHandle(ref, () => ({
      isOverlap: isOverlapping,
    }));

    const startTimer = () => {
      if (!timer) {
        timer = setInterval(() => {
          setStartTime((prevS) => prevS - 1000);
        }, 1000);
      }
    };

    useEffect(() => {
      if (gameState === GameState.Starting) {
        startTimer();
      } else {
        clearInterval(timer);
        setStartTime(START_DELAY);
      }

      return () => {
        clearInterval(timer);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState, startTime]);

    useEffect(() => {
      setTargetDeg(Math.floor(Math.random() * 360)); // 0-359deg
    }, [points]);

    return (
      <GameBoardBg>
        <GameBoardBgCenter>
          {gameState === GameState.New && (
            <GameBoardBgCenterText
              top="CLICK"
              center={<Pointer size={64} />}
              bottom="TO PLAY"
              animate
            />
          )}
          {gameState === GameState.Starting && (
            <GameBoardBgCenterText
              top="STARTING"
              center={(startTime / 1000).toFixed(0)}
              bottom="IN"
            />
          )}
          {gameState === GameState.Started && (
            <GameBoardBgCenterText center={points} />
          )}
          {gameState === GameState.Ended && (
            <GameBoardBgCenterText
              top="GAME OVER"
              center={points}
              bottom="Click to Play Again"
            />
          )}
        </GameBoardBgCenter>

        <Needle
          gameState={gameState}
          ref={needleRef}
          points={points}
          rotationDirection={rotationDirection}
        />

        {gameState === GameState.Started && (
          <Target
            ref={targetRef}
            rotationDirection={rotationDirection}
            targetDeg={targetDeg}
          />
        )}

        {(gameState === GameState.New || gameState === GameState.Ended) && (
          <TargetDemo />
        )}
      </GameBoardBg>
    );
  }
);

GameBoard.displayName = 'GameBoard';
