import {Component, OnInit} from '@angular/core';


import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Program, ProgramDay, ProgramsService} from '../../services/programs.service';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.scss']
})
export class ProgramComponent implements OnInit {
  program: Program;
  progress: Map<number, string>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProgramsService,
    private userService: UserService
  ) {
  }

  ngOnInit() {
    // subscribe to the parameters observable
    this.route.paramMap.subscribe(params => {
      this.progress = this.userService.getProgress();
      this.program = this.service.getProgramByName(params.get('name'));
      this.program.days.map((d: ProgramDay, index) => {
        d.isDone = this.progress.has(index);
      });
    });

  }

}
