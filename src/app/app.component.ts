import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private router: Router) {

  }

  ngOnInit() {
    if (localStorage.getItem('LAST_ROUND')) {
      const state = JSON.parse(localStorage.getItem('LAST_ROUND'));
      this.router.navigate(['/program-day', state.programName, state.dayIndex]);
    }
    // this.router.navigate(['/program-day', '5k', '0']);
  }

}
