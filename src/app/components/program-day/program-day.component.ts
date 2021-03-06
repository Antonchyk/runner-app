import {Component, OnInit} from '@angular/core';
import Timer from '../../core/Timer';
import {ProgramDay, ProgramsService, TimerItem} from '../../services/programs.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Howl} from 'howler';


@Component({
  selector: 'app-program-day',
  templateUrl: './program-day.component.html',
  styleUrls: ['./program-day.component.css']
})
export class ProgramDayComponent implements OnInit {

  time = '00:00:0';
  timer: Timer;
  type = '';
  distance = 0;
  progress = 100;
  // stepsList: {
  //   name: string;
  //   value: number
  // }[] = [];
  private roundIndex = 0;
  private schedule: TimerItem[] = [];
  private inPause = false;
  day: ProgramDay;
  inDistance = false;
  programName: string | null;
  private sound: Howl;


  constructor
  (
    private route: ActivatedRoute,
    private router: Router,
    private service: ProgramsService
  ) {
    this.timer = new Timer();
    this.timer.emitter.on('tick', () => this.onTick());
    this.timer.emitter.on('finished', () => this.onTimerFinished());
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      const index = +params.get('day-index');
      this.programName = params.get('program-name');
      this.day = this.service.getProgramDay(this.programName, index);
      this.schedule = this.day.timing;
      this.type = this.schedule[0].type;
    });
    this.sound = new Howl({
      src: ['../../../assets/sounds/beep.wav'],
      html5: true
    });
  }

  startTimer() {
    if (this.inPause) {
      this.inPause = false;
      this.timer.unPause();
    } else {
      this.roundIndex = 0;
      this.type = this.schedule[0].type;
      this.timer.stop();
      this.timer.start(this.schedule[0].time);
    }
  }

  stopTimer() {
    this.inPause = false;
    this.timer.stop();
    this.roundIndex = 0;
    this.type = this.schedule[0].type;
    this.showTime(new Date(this.schedule[0].time));
  }

  pauseTimer() {
    if (this.timer.getTime() > 0) {
      this.inPause = true;
      this.timer.pause();
    }
  }

  finishDistance() {
    this.inDistance = false;
    this.onTimerFinished();
  }

  private onTick() {
    const timeLeft = new Date(this.timer.getTime());
    this.showTime(timeLeft);
    this.progress = (this.timer.getTime() / this.schedule[this.roundIndex].time) * 100;
  }

  private showTime(timeDate: Date) {
    const minutes = timeDate.getMinutes() < 10 ? '0' + timeDate.getMinutes() : timeDate.getMinutes();
    const seconds = timeDate.getSeconds() < 10 ? '0' + timeDate.getSeconds() : timeDate.getSeconds();
    const milliSeconds = Math.floor(timeDate.getMilliseconds() / 100);
    this.time = `${minutes}:${seconds}:${milliSeconds}`;
  }

  private onTimerFinished() {
    if (this.roundIndex < (this.schedule.length - 1)) {
      this.roundIndex++;
      const currentSchedule = this.schedule[this.roundIndex];
      this.type = currentSchedule.type;
      if (currentSchedule.distance > 0) {
        this.inDistance = true;
        this.distance = currentSchedule.distance;
      } else if (currentSchedule.time > 0) {
        this.timer.start(currentSchedule.time);
        this.sound.play();
      }
    } else {
      this.type = 'you are done';
    }
  }

}
