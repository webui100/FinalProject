import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import {
  MatFormFieldModule,
  MatInputModule,
  MatCardModule,
  MatButtonModule,
  MatCheckboxModule,
  MatIconModule,
  MatGridListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatCommonModule,
  MatSidenavModule,
  MatToolbarModule,
  MatBadgeModule,
  MatSelectModule,
  MatExpansionModule,
  MatAutocompleteModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { httpInterceptorProviders } from './interceptors/http-interceptor';
import { TeachersComponent } from './containers/teachers/teachers.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StudentsComponent } from './pages/students/students.component';
import { reducers, metaReducers } from './store';
import { ScheduleComponent } from './containers/schedule/schedule.component';
import { DailyScheduleComponent } from './containers/schedule/daily-schedule/daily-schedule.component';

import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MatListModule } from '@angular/material';
import { AdminPanelComponent } from './containers/admin-panel/admin-panel.component';
import {ChartsModule} from 'ng2-charts';
import 'hammerjs';
import { TeacherCardComponent } from './containers/teachers/teacher-card/teacher-card.component';
import { ErrorService } from './services/error.service';
import { StudentDiaryComponent } from './containers/student-diary/student-diary.component';
import { TeacherCreateComponent } from './containers/teachers/teacher-create/teacher-create.component';
import { TemporaryComponent } from './components/temporary/temporary.component';
import { MaterialModule } from './modules/material/material.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StudentsComponent,
    TeachersComponent,
    MainNavComponent,
    ScheduleComponent,
    DailyScheduleComponent,
    AdminPanelComponent,
    TeacherCardComponent,
    StudentDiaryComponent,
    TeacherCreateComponent,
    TemporaryComponent
  ],
  imports: [
    ChartsModule,
    MatListModule,
    BrowserModule,
    RouterModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSortModule,
    MatSelectModule,
    MatExpansionModule,
    MatAutocompleteModule,
    MaterialModule,
    StoreModule.forRoot(reducers, {
      metaReducers
      // runtimeChecks: {
      //   strictStateImmutability: true,
      //   strictActionImmutability: true
      // }
    }),
    // Instrumentation must be imported after importing StoreModule (config is optional)
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production // Restrict extension to log-only mode
    })
  ],
  providers: [
    { provide: ErrorHandler, useClass: ErrorService },
    httpInterceptorProviders
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
