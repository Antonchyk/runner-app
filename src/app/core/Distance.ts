import {EventEmitter} from 'events';
import {getDistanceFromGeo} from '../utils/utils';

export interface ITikcer {

  emitter: EventEmitter;

  getCurrentValue(): number;

  start(value?: number);

  stop();

  pause();

  unPause();
}

export default class Distance implements ITikcer {

  emitter = new EventEmitter();
  private timer = null;
  private currentValue = 0;
  private TICK = 1000;
  private lastLong = 0;
  private lastLat = 0;
  private plannedDistance = null;

  constructor() {

  }

  getCurrentValue() {
    return this.currentValue;
  }

  start(value?: number) {
    this.plannedDistance = value;
    window.navigator.geolocation.getCurrentPosition(pos => {
      this.lastLong = pos.coords.longitude;
      this.lastLat = pos.coords.latitude;
      this.timer = setInterval(() => {
        this.updateDistance();
        if (value && value <= this.currentValue) {
          this.emitter.emit('finished');
          this.stop();
        }
      }, this.TICK);
    });
  }

  stop() {
    this.currentValue = 0;
    clearInterval(this.timer);
  }

  pause() {
    clearInterval(this.timer);
  }

  unPause() {
    this.start(this.plannedDistance);
  }

  private updateDistance() {
    window.navigator.geolocation.getCurrentPosition(pos => {
      this.currentValue = getDistanceFromGeo(pos.coords.longitude, pos.coords.latitude, this.lastLong, this.lastLong);
      // this.lastLong = pos.coords.longitude;
      // this.lastLat = pos.coords.latitude;
      this.emitter.emit('tick', this.currentValue);
    });
  }

}
