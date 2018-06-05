import {EventEmitter} from 'events';
/**
 * Created by antonchyk on 4/24/18.
 */
export default class TimerCountdown {
  private timer = null;
  private currentTime = 0;
  private TICK = 50;
  emitter = new EventEmitter();

  constructor() {

  }

  getTime(): number {
    return this.currentTime;
  }

  start(time: number) {
    const countDownTime = new Date().getTime() + time;
    this.timer = setInterval(() => {
      const now = new Date().getTime();
      this.currentTime = countDownTime - now;
      if (this.currentTime < 0) {
        this.stop();
        this.emitter.emit('finished');
      }
      this.emitter.emit('tick', this.currentTime);
    }, this.TICK);
  }

  pause() {
    clearInterval(this.timer);
  }

  unPause() {
    this.start(this.currentTime);
  }

  play() {
    this.start(this.currentTime);
  }

  stop() {
    this.currentTime = 0;
    clearInterval(this.timer);
  }

}
