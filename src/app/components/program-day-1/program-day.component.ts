import {Component, OnDestroy, OnInit} from '@angular/core';
import Timer from '../../core/TimerM';
import {ProgramDay, ProgramsService, TimerItem} from '../../services/programs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Howl} from 'howler';
import {UserService} from '../../services/user.service';

const SAVE_INTERVAL = 2000;
const INTERVAL = 100;

@Component({
  selector: 'app-program-day-1',
  templateUrl: './program-day.component.html',
  styleUrls: ['./program-day.component.scss']
})
export class ProgramDay1Component implements OnInit, OnDestroy {

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
    private userService: UserService
  ) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.dayIndex = +params.get('day-index');
      this.programName = params.get('program-name');
      this.day = this.service.getProgramDay(this.programName, this.dayIndex);
      this.schedule = this.day.timing;
      this.roundIndex = 0;
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

  start() {
    if (this.inPause) {
      this.inPause = false;
      this.timer.start();
      // this.timeLeftTimer.start();
    } else {
      this.inProgress = true;
      this.roundIndex = 0;
      this.type = this.schedule[0].type;

      this.timer = new Timer(this.schedule[0].time, INTERVAL);
      this.timer.onInterval((time) => this.onTick(time));
      this.timer.onComplete(() => this.onTimerFinished());
      this.timer.start();

      // this.timeLeftTimer = new Timer(this.getTotalTime(this.day), INTERVAL);
      // this.timeLeftTimer.onInterval(time => this.updateTotalTimeLeft(time));
      // this.timeLeftTimer.start();
    }
  }

  pauseTimer() {
    this.inProgress = false;
    this.inPause = true;
    this.timer.pause();
    // this.timeLeftTimer.pause();
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
    this.onTimerFinished();
  }

  private onTick(time: number) {
    this.time = new Date(time);
    this.progress = (time / this.schedule[this.roundIndex].time) * 100;
    this.inProgress = true;
    this.saveCurrentState();
  }

  private onTimerFinished() {
    if (this.roundIndex < (this.schedule.length - 1)) {
      this.roundIndex++;
      const currentSchedule = this.schedule[this.roundIndex];
      this.type = currentSchedule.type;
      this.timer.stop();
      this.timer = new Timer(currentSchedule.time, INTERVAL);
      this.timer
        .onInterval(time => this.onTick(time))
        .onComplete(() => {
          this.onTimerFinished();
        })
        .start();
      this.sound.play();
    } else {
      this.type = 'you_are_done';
      this.inProgress = false;
      this.dayIsDone = true;
      localStorage.removeItem('LAST_ROUND');
    }
  }

  private saveCurrentState() {
    this.saveCounter += this.timer.getTime();
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

  private updateTotalTimeLeft(time: number) {
    this.totalTimeLeft = time;
  }

}
