import {EventEmitter} from 'events';

export type TimerFunc = (time: number) => void;

/**
 * Created by antonchyk on 4/24/18.
 */
export default class TimerM {
  private timer = null;
  private currentTime = 0;
  private tick = 0;
  private finishHandler: () => void;
  private subscribers: TimerFunc[] = [];
  private onTickFunc: (time: number) => void;

  constructor(totalTime: number, interval: number) {
    this.currentTime = totalTime;
    this.tick = interval;
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
      const time = this.getTime();
      this.onTickFunc.call(this, time);
    }, this.tick);
  }

  pause(): TimerM {
    clearInterval(this.timer);
    return this;
  }

  stop(): TimerM {
    this.currentTime = 0;
    clearInterval(this.timer);
    return this;
  }

  getTime(): number {
    return this.currentTime;
  }

  subscribe(next: (time) => void): TimerM {
    this.subscribers.push(next);
    return this;
  }

  onComplete(cb: () => void): TimerM {
    this.finishHandler = cb;
    return this;
  }

  onInterval(cb: (time: number) => void): TimerM {
    this.onTickFunc = cb;
    return this;
  }

  private notify() {
    this.subscribers.forEach(i => i.call(this, this.getTime()));
  }

}
