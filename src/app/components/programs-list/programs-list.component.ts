import {Component, OnInit} from '@angular/core';
import {Program, ProgramsService} from '../../services/programs.service';

@Component({
  selector: 'app-programs-list',
  templateUrl: './programs-list.component.html',
  styleUrls: ['./programs-list.component.css']
})
export class ProgramsListComponent implements OnInit {

  list: Program[] = [];

  constructor(private programsService: ProgramsService) {
  }

  ngOnInit() {
    this.list = this.programsService.getProgramList();
  }

}
