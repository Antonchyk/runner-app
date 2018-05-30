import {Directive, ElementRef, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';

@Directive({
  selector: '[appClockTime]',
})
export class ClockTimeDirective implements OnChanges, OnInit {
  @Input('appClockTime') cTime: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    // const date = new Date(this.cTime);
    // const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    // const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    // this.el.nativeElement.innerHTML = `${minutes}m:${seconds}s`;
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('got name: ', changes.cTime.currentValue);
  }

}
