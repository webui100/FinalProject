import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
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
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { reducers, metaReducers } from './store';
import { LoginComponent } from './pages/login/login.component';
import { httpInterceptorProviders } from './interceptors/http-interceptor';
import { TeachersComponent } from './containers/admin-panel/teachers/teachers.component';
import { AdminPanelComponent } from './containers/admin-panel/admin-panel.component';
import { StudentsComponent } from './pages/student/students.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { TemporaryComponent } from './components/temporary/temporary.component';
import { StudentDiaryComponent } from './containers/student-panel/student-diary/student-diary.component';
import { StudentPanelComponent } from './containers/student-panel/student-panel.component';
import { TeacherPanelComponent } from './containers/teacher-panel/teacher-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    TeachersComponent,
    AdminPanelComponent,
    StudentsComponent,
    MainNavComponent,
    TemporaryComponent,
    StudentDiaryComponent,
    StudentPanelComponent,
    TeacherPanelComponent
  ],
  imports: [
    MatListModule,
    MatCommonModule,
    MatBadgeModule,
    MatToolbarModule,
    MatSidenavModule,
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
    MatDatepickerModule,
    MatNativeDateModule,
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
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
