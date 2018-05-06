import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgramDayComponent } from './program-day.component';

describe('RunListComponent', () => {
  let component: ProgramDayComponent;
  let fixture: ComponentFixture<ProgramDayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgramDayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgramDayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
