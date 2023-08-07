'use client';

import { FC, useState, useEffect } from 'react';
import { Frown, Palette, Pointer, Trophy } from 'lucide-react';
import { GameState } from '@/lib/types';

const TIMER = 500; // time in ms
const DIFFICULTY = 30; // TIMER - (correctColors length * time in ms)

const colors = ['#ef4444', '#f97316', '#84cc16', '#22c55e', '#ec4899'];

const createConicString = (color: string, value: number) => {
  return `${color} ${value * 10}%, ${color} ${(value + 1) * 10}%`;
};

const GameBoard2: FC = () => {
  let timer: NodeJS.Timer | undefined;
  const [gameState, setGameState] = useState(GameState.New);
  const [tickRate, setTickRate] = useState(false);
  const [correctColors, setCorrectColors] = useState<string[]>([]);
  const [currentColor, setCurrentColor] = useState(0);

  const conicGradientColors = correctColors.map((color, index) =>
    createConicString(color, index)
  );

  conicGradientColors.push(
    createConicString(colors[currentColor], correctColors.length)
  );

  const tick = () => {
    if (!timer) {
      timer = setInterval(
        () => {
          setTickRate((prevS) => !prevS);
          const nextIndex = (currentColor + 1) % colors.length;
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
  }, [tickRate]);

  const btnHandler = () => {
    switch (gameState) {
      case GameState.New:
        setGameState(GameState.Started);
        setCorrectColors((prevS) => prevS.concat(colors[currentColor]));
        break;

      case GameState.Started:
        setCorrectColors((prevS) => prevS.concat(colors[currentColor]));

        if (
          correctColors.length > 0 &&
          !correctColors.includes(colors[currentColor])
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
      <div className="relative grid place-items-center">
        <div className="absolute margin-auto rounded-full aspect-square w-64 bg-cyan-600 animate-ping" />
        <section className="relative rounded-full bg-slate-900 aspect-square w-96 border-8 border-cyan-600 overflow-hidden">
          <div className="absolute inset-0 grid place-items-center z-20">
            <div className="rounded-full w-2/3 bg-cyan-600 aspect-square flex justify-center text-white">
              <div className="grid place-items-center">
                {gameState === GameState.New && (
                  <>
                    <span className="self-end">CLICK</span>
                    <span className="font-bold text-6xl animate-bounce ">
                      <Pointer size={64} />
                    </span>
                    <span className="self-start">TO PLAY</span>
                  </>
                )}
                {gameState === GameState.Started && (
                  <>
                    <span className="self-end">MATCH</span>
                    <span className="font-bold text-6xl animate-bounce ">
                      <Palette size={64} />
                    </span>
                    <span className="self-start">COLORS</span>
                  </>
                )}
                {gameState === GameState.Ended && (
                  <>
                    <span className="self-end">GAME OVER</span>
                    <span className="font-bold text-6xl animate-bounce ">
                      <Frown size={64} />
                    </span>
                    <span className="self-start">PLAY AGAIN?</span>
                  </>
                )}
                {gameState === GameState.Winner && (
                  <>
                    <span className="self-end">WINNER</span>
                    <span className="font-bold text-6xl animate-bounce ">
                      <Trophy size={64} />
                    </span>
                    <span className="self-start">PLAY AGAIN?</span>
                  </>
                )}
              </div>
            </div>
          </div>

          <div
            className="bg-slate-900 absolute inset-0"
            style={{
              background: `conic-gradient(${conicGradientColors.join(
                ','
              )}, transparent 0%)`,
            }}
          />
        </section>
      </div>
      <button
        className="absolute inset-0 z-50 w-full h-full"
        onClick={btnHandler}
      ></button>
    </>
  );
};

export default GameBoard2;
