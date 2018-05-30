import {Injectable} from '@angular/core';

export interface User {
  progress: Map<number, string>;
}

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() {
  }

  saveProgress(dayIndex: number, programName: string): Promise<void> {
    const progress = localStorage.getItem('user_progress');
    let progressObj: Map<number, string> = new Map<number, string>();
    if (progress) {
      progressObj = new Map(JSON.parse(progress));
    }
    progressObj.set(dayIndex, programName);
    const progressString = JSON.stringify(Array.from(progressObj.entries()));
    localStorage.setItem('user_progress', progressString);
    return Promise.resolve();
  }

  getProgress(): Map<number, string> {
    const progress = localStorage.getItem('user_progress');
    if (progress) {
      return new Map(JSON.parse(progress));
    } else {
      return null;
    }
  }

}
