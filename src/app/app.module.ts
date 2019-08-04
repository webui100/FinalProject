import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './modules/material/material.module';
import { reducers, metaReducers } from './store';
import { httpInterceptorProviders } from './interceptors/http-interceptor';
import { ErrorService } from './services/error.service';
import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StudentsComponent } from './pages/student/students.component';
import { TeachersComponent } from './containers/teachers/teachers.component';
import { StudentDiaryComponent } from './containers/student-diary/student-diary.component';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { MatListModule } from '@angular/material';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import {ChartsModule} from 'ng2-charts';
import { TemporaryComponent } from './components/temporary/temporary.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    StudentsComponent,
    TeachersComponent,
    StudentDiaryComponent,
    MainNavComponent,
    AdminPanelComponent,
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
