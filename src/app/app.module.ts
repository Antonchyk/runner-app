import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


import {AppComponent} from './app.component';
import {ProgramDayComponent} from './components/program-day/program-day.component';
import {ProgramsListComponent} from './components/programs-list/programs-list.component';
import {ProgramsService} from './services/programs.service';
import {ProgramComponent} from './components/program/program.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {CdkTableModule} from '@angular/cdk/table';
// import {CdkTreeModule} from '@angular/cdk/tree';
import {
  MatAutocompleteModule, MatButtonModule,
  MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule, MatExpansionModule, MatFormFieldModule, MatGridListModule,
  MatIconModule, MatInputModule, MatListModule, MatMenuModule, MatPaginatorModule,
  MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule,
  MatStepperModule, MatTableModule, MatTabsModule, MatToolbarModule, MatTooltipModule
} from '@angular/material';
import {ClockTimeDirective} from './directives/clock-time.directive';
import {UserService} from './services/user.service';
import {DistanceService} from './services/distance.service';
import {environment} from '../environments/environment';
import {AngularFireModule} from '@angular/fire';
import {AuthComponent} from './components/auth/auth.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ProgramsListComponent,
  },
  {
    path: 'program/:name',
    component: ProgramComponent,
  },
  {
    path: 'program-day/:program-name/:day-index',
    component: ProgramDayComponent,
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProgramDayComponent,
    ProgramsListComponent,
    ProgramComponent,
    ClockTimeDirective,
    AuthComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    CdkTableModule,
    // CdkTreeModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatSnackBarModule,
    MatSortModule,
    MatStepperModule,
    MatTableModule,
    MatTabsModule,
    MatToolbarModule,
    MatTooltipModule,
    AngularFireModule.initializeApp(environment.firebase)
  ],
  providers: [
    ProgramsService,
    UserService,
    DistanceService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
