import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Program, ProgramDay, ProgramsService} from '../../services/programs.service';
import {Observable} from 'rxjs/Observable';

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
