import {Component, OnDestroy, OnInit} from '@angular/core';
import Timer from '../../core/Timer';
import {ProgramDay, ProgramsService, TimerItem} from '../../services/programs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Howl} from 'howler';
import {UserService} from '../../services/user.service';
import {DistanceService} from '../../services/distance.service';

const SAVE_INTERVAL = 2000;

@Component({
  selector: 'app-program-day',
  templateUrl: './program-day.component.html',
  styleUrls: ['./program-day.component.scss']
})
export class ProgramDayComponent implements OnInit, OnDestroy {

  time: Date = new Date(0);
  timer: Timer;
  type = '';
  distance = 0;
  progress = 100;
  day: ProgramDay;
  inDistance = false;
  programName: string | null;
  inProgress = false;
  roundIndex = 0;
  schedule: TimerItem[] = [];
  inPause = false;
  dayIndex: number;
  dayIsDone = false;
  totalTimeLeft: number;
  private sound: Howl;
  private timeLeftTimer: Timer;
  private saveCounter = 0;


  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    private service: ProgramsService,
    private userService: UserService,
    private distanceService: DistanceService
  ) {
    this.timer = new Timer();
    this.timer.emitter.on('tick', () => this.onTick());
    this.timer.emitter.on('finished', () => this.onTimerFinished());

    this.timeLeftTimer = new Timer();
    this.timeLeftTimer.emitter.on('tick', () => this.updateTotalTimeLeft());
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.dayIndex = +params.get('day-index');
      this.programName = params.get('program-name');
      this.day = this.service.getProgramDay(this.programName, this.dayIndex);
      this.schedule = this.day.timing;
      this.type = this.schedule[0].type;
      this.totalTimeLeft = this.getTotalTime(this.day);
    });
    this.sound = new Howl({
      src: ['../../../assets/sounds/beep.wav'],
      html5: true
    });
  }

  ngOnDestroy() {
    localStorage.removeItem('LAST_ROUND');
  }

  startTimer() {
    if (this.inPause) {
      this.inPause = false;
      this.timer.unPause();
      this.timeLeftTimer.unPause();
    } else {
      this.roundIndex = 0;
      this.type = this.schedule[0].type;
      this.timer.stop();
      this.timer.start(this.schedule[0].time);
      this.timeLeftTimer.stop();
      this.timeLeftTimer.start(this.totalTimeLeft);
    }
  }

  stopTimer() {
    this.inPause = false;
    this.timer.stop();
    this.roundIndex = 0;
    this.type = this.schedule[0].type;
    this.inProgress = false;
    this.time = new Date(this.schedule[0].time);
  }

  pauseTimer() {
    if (this.timer.getTime() > 0) {
      this.inPause = true;
      this.timer.pause();
      this.inProgress = false;
      this.timeLeftTimer.pause();
    }
  }

  finishDistance() {
    this.inDistance = false;
    this.onTimerFinished();
  }

  saveDay() {
    this.userService.saveProgress(this.dayIndex, this.programName)
      .then(() => {
        console.log('Progress saved');
      });
    this.router.navigate(['/program', this.programName]);
    localStorage.removeItem('LAST_ROUND');
  }

  next() {
    this.timer.stop();
    this.onTimerFinished();
  }

  private onTick() {
    this.time = new Date(this.timer.getTime());
    this.progress = (this.timer.getTime() / this.schedule[this.roundIndex].time) * 100;
    this.inProgress = true;
    this.saveCurrentState();
  }

  private onTimerFinished() {
    if (this.roundIndex < (this.schedule.length - 1)) {
      this.roundIndex++;
      const currentSchedule = this.schedule[this.roundIndex];
      this.type = currentSchedule.type;
      if (currentSchedule.distance > 0) {
        this.inDistance = true;
        this.distanceService.start();
      } else if (currentSchedule.time > 0) {
        this.timer.start(currentSchedule.time);
        this.timeLeftTimer.stop();
        this.timeLeftTimer.start(this.getTotalTime(this.day));
        this.sound.play();
      }
    } else {
      this.type = 'you are done';
      this.inProgress = false;
      this.dayIsDone = true;
      localStorage.removeItem('LAST_ROUND');
    }
  }

  private subscribeToPageHide() {
    // window.addEventListener('pagehide', () => {
    //   localStorage.setItem('pagehide', 'true');
    //   // this.saveCurrentStateBeforeClose();
    // }, false);
    // window.addEventListener('blur', () => {
    //   localStorage.setItem('blur', 'true');
    //   this.saveCurrentStateBeforeClose();
    // }, false);
    // window.addEventListener('abort', () => {
    //   localStorage.setItem('abort', 'true');
    // }, false);
    // window.addEventListener('touchcancel', () => {
    //   localStorage.setItem('touchcancel', 'true');
    // }, false);
    // window.addEventListener('unload', () => {
    //   localStorage.setItem('unload', 'true');
    //   this.saveCurrentStateBeforeClose();
    // }, false);
  }

  private saveCurrentState() {
    this.saveCounter += this.timer.tick;
    if (this.saveCounter > SAVE_INTERVAL) {
      this.saveCounter = 0;
      const state = {
        programName: this.programName,
        dayIndex: this.dayIndex,
        roundIndex: this.roundIndex,
        roundTimeLeft: this.timer.getTime()
      };
      localStorage.setItem('LAST_ROUND', JSON.stringify(state));
    }
  }

  private getTotalTime(day: ProgramDay): number {
    let sum = 0;
    day.timing
      .slice(this.roundIndex)
      .map(i => {
        sum += i.time;
      });
    return sum;
  }

  private updateTotalTimeLeft() {
    this.totalTimeLeft = this.timeLeftTimer.getTime();
  }

}
