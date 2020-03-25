import {getMousePos, getScreenSize, moveMouseSmooth} from 'robotjs';
import {on as registerMouseEvent, start as startListeners} from 'iohook';

function wiggleMouseLeftToRight(distance: number) {
  const {x, y} = getMousePos();
  moveMouseSmooth(cropHorizontalToScreen(x + distance), y);
  moveMouseSmooth(cropHorizontalToScreen(x - distance), y);
  moveMouseSmooth(x, y);
}

function cropHorizontalToScreen(x: number): number {
  return x <= 0 ? 0 : Math.min(x, getScreenSize().width);
}

function setupInterval(intervalPeriodMillis: number): void {
  setInterval(() => wiggleMouseLeftToRight(100), intervalPeriodMillis);
}

function setupMousedownCancellation() {
  registerMouseEvent('mousedown', (_) => {
    console.log('Shutting down');
    process.exit(0);
  });
  startListeners();
}

export function startAntiAFK(intervalPeriodMillis: number = 3000) {
  setupInterval(intervalPeriodMillis);
  setupMousedownCancellation();
}
