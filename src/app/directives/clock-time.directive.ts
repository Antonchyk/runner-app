import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive({
  selector: '[appClockTime]'
})
export class ClockTimeDirective implements OnInit {
  @Input() cTime: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    const date = new Date(this.cTime);
    const minutes = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
    const seconds = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    this.el.nativeElement.innerHTML = `${minutes}m : ${seconds}s`;
    console.log(date.getSeconds());
  }

}
