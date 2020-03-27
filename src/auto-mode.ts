import {getMousePos} from 'robotjs';
import {on as registerIOEvent, start as startListeners} from 'iohook';
import {wiggleMouseLeftToRight} from './anti-afk';

export class AntiAfkAuto {

  private readonly inactiveTimeoutSeconds;
  private readonly moveIntervalMillis;

  private interval: NodeJS.Timeout;
  private lastTimeMoved = Date.now();
  private lastYPos = -1;

  constructor(
      inactiveTimeoutSeconds: number = 10,
      moveIntervalMillis: number = 3000,
  ) {
    this.inactiveTimeoutSeconds = inactiveTimeoutSeconds;
    this.moveIntervalMillis = moveIntervalMillis;

    this.initListeners();
  }

  public start(): NodeJS.Timeout {
    this.interval = setInterval(
        () => this.wiggleMouse(),
        this.moveIntervalMillis,
    );
    return this.interval;
  }

  public stop(): void {
    clearInterval(this.interval);
  }

  private wiggleMouse(): void {
    const shouldMove =
        (this.lastTimeMoved + this.inactiveTimeoutSeconds * 1000) < Date.now();
    if (shouldMove) {
      wiggleMouseLeftToRight(100);
    }
  }

  private initListeners(): void {
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

  private registerInteraction(): void {
    this.lastTimeMoved = Date.now();
    this.lastYPos = getMousePos().y;
  }

}
