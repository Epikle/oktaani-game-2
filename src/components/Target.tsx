import { FC, HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const TargetDemo: FC = () => {
  return (
    <>
      <div className="absolute m-auto left-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[12rem] border-t-red-500 border-r-[50px] border-r-transparent origin-bottom" />
      <div className="absolute m-auto left-0 right-0 w-0 h-0 border-l-[50px] border-l-transparent border-t-[12rem] border-t-green-500 border-r-[50px] border-r-transparent origin-bottom rotate rotate-90" />
    </>
  );
};

export const Target = forwardRef<
  HTMLDivElement,
  HTMLAttributes<HTMLDivElement> & {
    targetDeg: number;
    rotationDirection: boolean;
  }
>(({ className, targetDeg, rotationDirection, ...props }, ref) => (
  <div
    style={{ rotate: `${targetDeg}deg` }}
    className="flex justify-center origin-bottom"
  >
    <div
      className={cn(
        'w-0 h-0 border-l-[50px] border-l-transparent border-t-[12rem]  border-r-[50px] border-r-transparent',
        { 'border-t-red-500': rotationDirection },
        { 'border-t-green-500': !rotationDirection },
        className
      )}
      {...props}
    />
    <div ref={ref} className="w-[95px] aspect-square absolute top-0 m-auto" />
  </div>
));

Target.displayName = 'Target';
