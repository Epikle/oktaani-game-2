'use client';

import {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Pointer } from 'lucide-react';
import { GameState, START_DELAY } from './Game';
import { cn } from '@/lib/utils';

interface GameBoardProps {
  gameState: GameState;
  points: number;
  rotationDirection: boolean;
  onOverlap: Dispatch<SetStateAction<boolean>>;
}

const GameBoard: FC<GameBoardProps> = ({
  gameState,
  points,
  rotationDirection,
  onOverlap,
}) => {
  let timer: NodeJS.Timer | undefined;
  let timer2: NodeJS.Timer | undefined;
  const needleRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);
  const [tickRate, setTickRate] = useState(false);
  const [startTime, setStartTime] = useState(START_DELAY);

  const isOverlapping = () => {
    const rect1 = needleRef?.current?.getBoundingClientRect();
    const rect2 = targetRef?.current?.getBoundingClientRect();

    if (!rect1 || !rect2) return false;

    return (
      rect1.bottom >= rect2.top &&
      rect1.top <= rect2.bottom &&
      rect1.right >= rect2.left &&
      rect1.left <= rect2.right
    );
  };

  const tick = () => {
    if (!timer) {
      timer = setInterval(() => {
        setTickRate((prevS) => !prevS);
      }, 10);
    }

    onOverlap(isOverlapping());
  };

  useEffect(() => {
    if (gameState === GameState.Started) {
      tick();
    }

    return () => {
      clearInterval(timer);
    };
  }, [gameState, tickRate]);

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
  }, [gameState, startTime]);

  return (
    <div className="relative grid place-items-center">
      <div className="absolute margin-auto rounded-full aspect-square w-64 bg-cyan-600 animate-ping" />
      <section className="relative rounded-full bg-slate-900 aspect-square w-96 overflow-hidden border-8 border-cyan-600">
        <div className="absolute inset-0 grid place-items-center z-20">
          <div className="rounded-full w-2/3 bg-cyan-600 aspect-square flex justify-center text-white">
            {gameState === GameState.New && (
              <div className="grid place-items-center">
                <span className="self-end">CLICK</span>
                <span className="font-bold text-6xl animate-bounce ">
                  <Pointer size={64} />
                </span>
                <span className="self-start">TO PLAY</span>
              </div>
            )}
            {gameState === GameState.Starting && (
              <div className="grid place-items-center">
                <span className="self-end">STARTING</span>
                <span className="font-bold text-6xl">
                  <span>{(startTime / 1000).toFixed(0)}</span>
                </span>
                <span className="self-start">IN</span>
              </div>
            )}
            {gameState === GameState.Started && (
              <div className="grid place-items-center">
                <span className="font-bold text-6xl">{points}</span>
              </div>
            )}
            {gameState === GameState.Ended && (
              <div className="grid place-items-center">
                <span className="self-end">GAME OVER</span>
                <span className="font-bold text-6xl">{points}</span>
                <span className="self-start">Click to play again</span>
              </div>
            )}
          </div>
        </div>

        <div
          style={{
            rotate: '0deg',
          }}
          className={cn(
            'z-10 absolute m-auto left-0 right-0 w-1 h-1/2 origin-bottom bg-orange-500',
            {
              'animate-[spin_3s_linear_infinite_alternate]':
                gameState === GameState.New || gameState === GameState.Ended,
            },
            {
              'animate-[spin_3s_linear_infinite]':
                gameState === GameState.Started,
            }
          )}
        >
          <div ref={needleRef} className=" h-1" />
        </div>

        {gameState === GameState.Started && (
          <div className="flex justify-center origin-bottom rotate-90">
            <div className="w-0 h-0 border-l-[50px] border-l-transparent border-t-[12rem] border-t-red-500 border-r-[50px] border-r-transparent" />
            <div
              ref={targetRef}
              className="w-[95px] aspect-square absolute top-0 m-auto"
            />
          </div>
        )}

        {(gameState === GameState.New || gameState === GameState.Ended) && (
          <>
            <div className="absolute m-auto left-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[12rem] border-t-red-500 border-r-[50px] border-r-transparent origin-bottom" />
            <div className="absolute m-auto left-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[12rem] border-t-green-500 border-r-[50px] border-r-transparent origin-bottom rotate rotate-90" />
          </>
        )}
      </section>
    </div>
  );
};

export default GameBoard;
