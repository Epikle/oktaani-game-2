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
import { normalizeAngle } from '@/lib/utils';

interface GameBoardProps {
  gameState: GameState;
  points: number;
  rotationDirection: boolean;
  hScore: number;
}

export interface GameBoardMethods {
  isOverlap: () => boolean;
}

export const GameBoard = forwardRef<GameBoardMethods, GameBoardProps>(
  ({ gameState, points, rotationDirection, hScore }, ref) => {
    let timer: NodeJS.Timer | undefined;
    let timer2: NodeJS.Timer | undefined;
    const needleRef = useRef<HTMLDivElement>(null);
    const [startTime, setStartTime] = useState(START_DELAY);
    const [targetDeg, setTargetDeg] = useState(0);
    const [needleDeg, setNeedleDeg] = useState(0);
    const isOverlapping = useOverlap(needleDeg, targetDeg, 18);

    useImperativeHandle(ref, () => ({
      isOverlap: isOverlapping,
    }));

    const tick = () => {
      if (!timer) {
        timer = setInterval(() => {
          setNeedleDeg((prevS) => {
            const angle = rotationDirection
              ? (prevS -= 1 + points / 10)
              : (prevS += 1 + points / 10);
            return normalizeAngle(angle);
          });
        }, 10);
      }
    };

    useEffect(() => {
      if (gameState === GameState.Started) {
        tick();
      }

      return () => {
        clearInterval(timer);
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gameState, needleDeg]);

    const startTimer = () => {
      if (!timer2) {
        timer2 = setInterval(() => {
          setStartTime((prevS) => prevS - 1000);
        }, 1000);
      }
    };

    useEffect(() => {
      if (gameState === GameState.Starting) {
        startTimer();
      } else {
        clearInterval(timer2);
        setStartTime(START_DELAY);
      }

      return () => {
        clearInterval(timer2);
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
              bottom={
                <span className="text-xs font-bold">
                  HIGH SCORE{' '}
                  <span className="text-sm text-yellow-400">
                    {points > hScore ? points : hScore}
                  </span>
                </span>
              }
            />
          )}
        </GameBoardBgCenter>

        <Needle
          gameState={gameState}
          ref={needleRef}
          rotationDirection={rotationDirection}
          needleDeg={needleDeg}
        />

        {gameState === GameState.Started && (
          <Target rotationDirection={rotationDirection} targetDeg={targetDeg} />
        )}

        {(gameState === GameState.New || gameState === GameState.Ended) && (
          <TargetDemo />
        )}
      </GameBoardBg>
    );
  }
);

GameBoard.displayName = 'GameBoard';
