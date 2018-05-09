import {Component, OnInit} from '@angular/core';


import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Program, ProgramsService} from '../../services/programs.service';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  program: Program;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private service: ProgramsService
  ) {}

  ngOnInit() {
    // subscribe to the parameters observable
    this.route.paramMap.subscribe(params => {
      this.program = this.service.getProgramByName(params.get('name'));
    });
  }

}
