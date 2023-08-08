import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const createConicString = (color: string, value: number) => {
  return `${color} ${value * 10}%, ${color} ${(value + 1) * 10}%`;
};

export const applyHysteresis = (target: number, hysteresis: number) => {
  const lowerBound = (target - hysteresis + 360) % 360;
  const upperBound = (target + hysteresis) % 360;

  return { lowerBound, upperBound };
};

export const normalizeAngle = (angle: number) => {
  let normalizedAngle = angle % 360;

  if (normalizedAngle < 0) {
    normalizedAngle += 360;
  }

  return normalizedAngle;
};

// Experimental way to get angle from HTMLElement
// export const getElemAngle = (elem: HTMLDivElement | null) => {
//   if (!elem) return 0;

//   const matrix = window.getComputedStyle(elem).getPropertyValue('transform');

//   if (matrix !== 'none') {
//     const values = matrix.split('(')[1].split(')')[0].split(',');
//     const a = +values[0];
//     const b = +values[1];
//     let angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
//     angle = angle < 0 ? (angle += 360) : angle;

//     return angle;
//   }

//   return 0;
// };
