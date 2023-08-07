import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { GameState } from '@/lib/types';

export const Needle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    gameState: GameState;
    rotationDirection: boolean;
    points: number;
  }
>(({ className, rotationDirection, gameState, points, ...props }, ref) => {
  let timer: NodeJS.Timer | undefined;
  const [needleDeg, setNeedleDeg] = useState(0);

  const tick = () => {
    if (!timer) {
      timer = setInterval(() => {
        setNeedleDeg((prevS) =>
          rotationDirection
            ? (prevS -= 1 + points / 10)
            : (prevS += 1 + points / 10)
        );
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

  return (
    <div
      style={{
        rotate: `${needleDeg}deg`,
        transition: 'all 50ms linear',
      }}
      className={cn(
        'z-10 absolute m-auto left-0 right-0 w-1 h-1/2 origin-bottom bg-orange-500',
        {
          'animate-[spin_3s_linear_infinite_alternate]':
            gameState === GameState.New || gameState === GameState.Ended,
        },
        className
      )}
      {...props}
    >
      <div ref={ref} className="h-1" />
    </div>
  );
});

Needle.displayName = 'Needle';
