import {getMousePos} from 'robotjs';
import {on as registerIOEvent, start as startListeners} from 'iohook';
import {wiggleMouseLeftToRight} from './anti-afk';

export class AntiAfkAuto {

  private readonly inactiveTimeoutSeconds;
  private readonly moveIntervalMillis;
  private cancellationKeyCodes;

  private interval: NodeJS.Timeout;
  private lastTimeMoved = 0;
  private lastYPos = -1;

  constructor(
      inactiveTimeoutSeconds: number = 10,
      moveIntervalMillis: number = 3000,
      cancellationKeyCodes?: number[],
  ) {
    this.inactiveTimeoutSeconds = inactiveTimeoutSeconds;
    this.moveIntervalMillis = moveIntervalMillis;
    this.cancellationKeyCodes = cancellationKeyCodes;
    this.initListeners();
  }

  public start() {
    this.interval = setInterval(() => this.wiggleMouse(),
        this.moveIntervalMillis);
  }

  public stop() {
    clearInterval(this.interval);
  }

  private wiggleMouse() {
    const shouldMove =
        (this.lastTimeMoved + this.inactiveTimeoutSeconds * 1000) < Date.now();
    if (shouldMove) {
      wiggleMouseLeftToRight(100);
    }
  }

  private initListeners() {
    registerIOEvent('mousemove', () => {
      if (getMousePos().y != this.lastYPos) {
        this.registerInteraction();
      }
    });

    registerIOEvent('keydown', () => {
      this.registerInteraction();
    });

    startListeners();
  }

  private registerInteraction() {
    this.lastTimeMoved = Date.now();
    this.lastYPos = getMousePos().y;
  }

}
