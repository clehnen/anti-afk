import {getMousePos, getScreenSize, moveMouseSmooth} from 'robotjs';
import {on as registerIOEvent, start as startListeners} from 'iohook';
import {unwatchFile} from 'fs';

export function startAntiAFK(
    intervalPeriodMillis: number = 3000,
    cancellationKeyCodes?: number[],
): void {
  setupInterval(intervalPeriodMillis);
  setupCancellationEvents(cancellationKeyCodes);
}

function setupInterval(intervalPeriodMillis: number): NodeJS.Timeout {
  return setInterval(() => wiggleMouseLeftToRight(100), intervalPeriodMillis);
}

function setupCancellationEvents(keyCodes?: number[]): void {
  registerIOEvent('mousedown', () => {
    shutdown();
  });

  registerIOEvent('keydown', (key) => {
    // close on ESC button press
    if (key.rawcode == 27 || (keyCodes?.includes(key.rawcode))) {
      shutdown();
    }

  });

  startListeners();
}

function wiggleMouseLeftToRight(distance: number): void {
  const {x, y} = getMousePos() as Point;

  const path: Point[] = [
    {x: cropHorizontalToScreen(x + distance), y},
    {x: cropHorizontalToScreen(x - distance), y},
    {x, y},
  ];

  path.map((pos) => moveMouseSmooth(pos.x, pos.y));
}

function cropHorizontalToScreen(x: number): number {
  return x <= 0 ? 0 : Math.min(x, getScreenSize().width);
}

function shutdown(): void {
  console.log('Shutting down');
  process.exit(0);
}

type Point = { x: number, y: number };

