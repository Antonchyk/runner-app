import {Injectable} from '@angular/core';
import {EventEmitter} from 'events';
import * as geo from 'geolib';

export interface Coords {
  latitude: number;
  longitude: number;
}

@Injectable()
export class DistanceService {
  emitter = new EventEmitter();
  private geo: any;
  private coords: Coords[] = [];
  private timer = null;
  private totalDistance: number;

  constructor() {
    this.geo = geo;
    navigator.geolocation.getCurrentPosition((position: Position) => {
    });
  }

  addPoint() {
    navigator.geolocation.getCurrentPosition((position: Position) => {
      // if (
      //   position.coords.longitude !== this.coords[0].longitude ||
      //   position.coords.latitude !== this.coords[0].latitude
      // ) {
      this.coords.push({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
      // }
    });
  }

  stop() {
    clearInterval(this.timer);
  }

  start() {
    this.timer = setInterval(() => {
      this.addPoint();
      // const c = [
      //   {latitude: 52.516272, longitude: 13.377722}, // Berlin
      //   {latitude: 51.515, longitude: 7.453619}
      // ];
      const distance = this.geo.getPathLength(this.coords);
      console.log(distance);
      if (distance !== this.totalDistance) {
        this.totalDistance = distance;
        this.emitter.emit('distance_changed', this.totalDistance);
      }
    }, 5000);
  }

}
