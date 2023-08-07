import { FC, HTMLAttributes, forwardRef } from 'react';

import { cn } from '@/lib/utils';

export const TargetDemo: FC = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute left-0 right-0 triangle bg-red-500 w-24 h-1/2 m-auto origin-bottom" />
      <div className="absolute left-0 right-0 triangle bg-green-500 w-24 h-1/2 m-auto origin-bottom rotate-90" />
    </div>
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
    className="absolute inset-0 origin-center"
  >
    <div
      className={cn(
        'absolute left-0 right-0 triangle w-24 h-1/2 m-auto',
        { 'bg-red-500': rotationDirection },
        { 'bg-green-500': !rotationDirection },
        className
      )}
      {...props}
    >
      <div ref={ref} className="w-[92%] h-2 mx-auto" />
    </div>
  </div>
));

Target.displayName = 'Target';
