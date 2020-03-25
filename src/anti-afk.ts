import {getMousePos, getScreenSize, moveMouseSmooth} from 'robotjs';
import {on as registerMouseEvent, start as startListeners} from 'iohook';

export function startAntiAFK(intervalPeriodMillis: number = 3000): void {
  setupInterval(intervalPeriodMillis);
  setupMousedownCancellation();
}

function setupInterval(intervalPeriodMillis: number): NodeJS.Timeout {
  return setInterval(() => wiggleMouseLeftToRight(100), intervalPeriodMillis);
}

function setupMousedownCancellation(): void {
  registerMouseEvent('mousedown', (_) => {
    console.log('Shutting down');
    process.exit(0);
  });
  startListeners();
}

function wiggleMouseLeftToRight(distance: number): void {
  const {x, y} = getMousePos();
  moveMouseSmooth(cropHorizontalToScreen(x + distance), y);
  moveMouseSmooth(cropHorizontalToScreen(x - distance), y);
  moveMouseSmooth(x, y);
}

function cropHorizontalToScreen(x: number): number {
  return x <= 0 ? 0 : Math.min(x, getScreenSize().width);
}


