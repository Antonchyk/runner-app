import {EventEmitter} from 'events';

/**
 * Created by antonchyk on 4/24/18.
 */
export default class TimerM {
  private timer = null;
  private currentTime = 0;
  private tick = 100;
  private intervalHandler: (time: number) => void;
  private finishHandler: () => void;

  constructor(totalTime: number, interval: number, intervalHandler?: (time: number) => void, finishHandler?: () => void) {
    this.currentTime = totalTime;
    this.tick = interval;
    this.intervalHandler = intervalHandler;
    this.finishHandler = finishHandler;
  }

  start() {
    const countDownTime = new Date().getTime() + this.currentTime;
    this.timer = setInterval(() => {
      const now = new Date().getTime();
      this.currentTime = countDownTime - now;
      if (this.currentTime < 0) {
        this.stop();
        this.finishHandler.call(null);
      }
      this.intervalHandler(this.currentTime);
    }, this.tick);
  }

  pause() {
    clearInterval(this.timer);
  }

  stop() {
    this.currentTime = 0;
    clearInterval(this.timer);
  }

  getTime(): number {
    return this.currentTime;
  }

}
