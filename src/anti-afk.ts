import {getMousePos, getScreenSize, moveMouseSmooth} from 'robotjs';

export function wiggleMouseLeftToRight(distance: number): void {
  type Point = { x: number, y: number };

  const {x, y} = getMousePos() as Point;

  const path: Point[] = [
    {x: limitToScreenSize(x + distance), y},
    {x: limitToScreenSize(x - distance), y},
    {x, y},
  ];

  path.forEach((pos) => moveMouseSmooth(pos.x, pos.y));
}

function limitToScreenSize(x: number): number {
  return x <= 0 ? 0 : Math.min(x, getScreenSize().width);
}
