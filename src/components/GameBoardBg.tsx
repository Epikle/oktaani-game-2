import { cn } from '@/lib/utils';
import { FC, ReactNode } from 'react';

interface GameBoardBgProps {
  children: ReactNode;
}

interface GameBoardBgCenterProps {
  children: ReactNode;
}

interface GameBoardBgCenterTextProps {
  top?: ReactNode;
  center: ReactNode;
  bottom?: ReactNode;
  animate?: boolean;
}

export const GameBoardBgCenterText: FC<GameBoardBgCenterTextProps> = ({
  top,
  center,
  bottom,
  animate,
}) => {
  return (
    <>
      {top && <span className="self-end">{top}</span>}
      <span className={cn('font-bold text-6xl', { 'animate-bounce': animate })}>
        {center}
      </span>
      {bottom && <span className="self-start">{bottom}</span>}
    </>
  );
};

export const GameBoardBgCenter: FC<GameBoardBgCenterProps> = ({ children }) => {
  return (
    <div className="absolute inset-0 grid place-items-center z-20">
      <div className="rounded-full w-2/3 bg-cyan-600 aspect-square flex justify-center text-white">
        <div className="grid place-items-center">{children}</div>
      </div>
    </div>
  );
};

export const GameBoardBg: FC<GameBoardBgProps> = ({ children }) => {
  return (
    <div className="relative grid place-items-center">
      <div className="absolute margin-auto rounded-full aspect-square w-56 bg-cyan-600 animate-ping" />
      <section className="relative rounded-full bg-slate-900 aspect-square w-80 overflow-hidden border-8 border-cyan-600">
        {children}
      </section>
    </div>
  );
};
