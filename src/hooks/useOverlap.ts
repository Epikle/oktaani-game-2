import { applyHysteresis } from '@/lib/utils';

export const useOverlap = (
  pointerDeg: number,
  targetDeg: number,
  hysteresis: number
) => {
  const isOverlapping = () => {
    const { lowerBound, upperBound } = applyHysteresis(targetDeg, hysteresis);

    if (lowerBound <= upperBound) {
      return pointerDeg >= lowerBound && pointerDeg <= upperBound;
    } else {
      return pointerDeg >= lowerBound || pointerDeg <= upperBound;
    }
  };

  return isOverlapping;
};
