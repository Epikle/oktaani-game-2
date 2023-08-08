import { HTMLAttributes, forwardRef, useEffect, useState } from 'react';

import { cn } from '@/lib/utils';
import { GameState } from '@/lib/types';

export const Needle = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    gameState: GameState;
    rotationDirection: boolean;
    needleDeg: number;
  }
>(({ className, gameState, rotationDirection, needleDeg, ...props }, ref) => {
  return (
    <div
      ref={ref}
      style={{ rotate: `${needleDeg}deg` }}
      className={cn(
        'z-10 absolute m-auto left-0 right-0 w-1 h-1/2 origin-bottom bg-orange-500',
        {
          'animate-[spin_3s_linear_infinite_alternate]':
            gameState === GameState.New || gameState === GameState.Ended,
        },
        className
      )}
      {...props}
    />
  );
});

Needle.displayName = 'Needle';
