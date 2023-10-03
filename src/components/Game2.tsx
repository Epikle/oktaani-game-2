'use client';

import { FC, useState, useEffect } from 'react';
import { Frown, Palette, Pointer, Trophy } from 'lucide-react';
import { GameState } from '@/lib/types';
import { createConicString } from '@/lib/utils';
import {
  GameBoardBg,
  GameBoardBgCenter,
  GameBoardBgCenterText,
} from './GameBoardBg';

const TIMER = 500; // time in ms
const DIFFICULTY = 30; // TIMER - (correctColors length * time in ms)
const COLORS = ['#7e22ce', '#4338ca', '#0f766e', '#ca8a04', '#ef4444'];

export const Game2: FC = () => {
  let timer: ReturnType<typeof setInterval> | undefined;
  const [gameState, setGameState] = useState(GameState.New);
  const [tickRate, setTickRate] = useState(false);
  const [correctColors, setCorrectColors] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState(0);

  const conicGradientColors = correctColors.map((color, index) =>
    createConicString(color, index)
  );
  conicGradientColors.push(
    createConicString(COLORS[currentColor], correctColors.length)
  );

  const tick = () => {
    if (!timer) {
      timer = setInterval(
        () => {
          setTickRate((prevS) => !prevS);
          const nextIndex = (currentColor + 1) % COLORS.length;
          setCurrentColor(nextIndex);
        },
        TIMER - correctColors.length * DIFFICULTY
      );
    }
  };

  useEffect(() => {
    tick();

    return () => {
      clearInterval(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tickRate, tick]);

  const btnHandler = () => {
    switch (gameState) {
      case GameState.New:
        setGameState(GameState.Started);
        setCorrectColors((prevS) => prevS.concat(COLORS[currentColor]));
        break;

      case GameState.Started:
        setCorrectColors((prevS) => prevS.concat(COLORS[currentColor]));
        setCurrentColor(Math.floor(Math.random() * COLORS.length));

        if (
          correctColors.length > 0 &&
          !correctColors.includes(COLORS[currentColor])
        ) {
          setGameState(GameState.Ended);
          break;
        }

        if (correctColors.length >= 9) {
          setGameState(GameState.Winner);
        }
        break;

      case GameState.Ended:
      case GameState.Winner:
        setCorrectColors([]);
        setGameState(GameState.Started);
        break;

      default:
        setCorrectColors([]);
        setGameState(GameState.New);
        break;
    }
  };

  return (
    <>
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
          {gameState === GameState.Started && (
            <GameBoardBgCenterText
              top="MATCH"
              center={
                <Palette
                  size={64}
                  style={{ color: COLORS[currentColor] }}
                  className="transition-colors"
                />
              }
              bottom="COLORS"
              animate
            />
          )}
          {gameState === GameState.Ended && (
            <GameBoardBgCenterText
              top="GAME OVER"
              center={<Frown size={64} />}
              bottom="PLAY AGAIN?"
              animate
            />
          )}
          {gameState === GameState.Winner && (
            <GameBoardBgCenterText
              top="WINNER"
              center={<Trophy size={64} className="stroke-yellow-500" />}
              bottom="PLAY AGAIN?"
              animate
            />
          )}
        </GameBoardBgCenter>

        <div
          className="bg-slate-900 absolute inset-0"
          style={{
            background: `conic-gradient(${conicGradientColors.join(
              ','
            )}, transparent 0%)`,
          }}
        />
      </GameBoardBg>

      <button
        className="absolute inset-0 z-40 w-full h-full"
        onClick={btnHandler}
      />
    </>
  );
};
