import { RefObject } from 'react';

export const useOverlap = (
  elem1: RefObject<HTMLDivElement>,
  elem2: RefObject<HTMLDivElement>
) => {
  const isOverlapping = () => {
    const rect1 = elem1?.current?.getBoundingClientRect();
    const rect2 = elem2?.current?.getBoundingClientRect();

    if (!rect1 || !rect2) return false;

    return (
      rect1.bottom >= rect2.top &&
      rect1.top <= rect2.bottom &&
      rect1.right >= rect2.left &&
      rect1.left <= rect2.right
    );
  };

  return isOverlapping;
};
