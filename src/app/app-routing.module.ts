import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from './containers/admin-panel/admin-panel.component';
import { LoginComponent } from './pages/login/login.component';
import { TeachersComponent } from './containers/teachers/teachers.component';

import { AdminComponent } from './pages/admin/admin.component';
import { TemporaryComponent } from './components/temporary/temporary.component';
import { StudentDiaryComponent } from './containers/student-diary/student-diary.component';
import {AdminGuard} from './services/guards/admin.guard';
import {TeacherGuard} from './services/guards/teacher.guard';
import {StudentGuard} from './services/guards/student.guard';
import { LoginGuard } from './services/guards/login.guard';
import {StudentsComponent} from "./pages/student/students.component";
import {TeacherComponent} from "../../../ngSoftServe/material-ng/src/app/teacher/teacher.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    canActivate: [LoginGuard]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'teacher',
    component: TeacherComponent,
    canActivate: [TeacherGuard]
  },
  {
    path: 'student',
    component: StudentsComponent,
    canActivate: [StudentGuard],
    children: [
      {path: 'diary',
        component: StudentDiaryComponent}
    ]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
      },
      {
        path: 'home',
        component: AdminPanelComponent
      },
      {
        path: 'pupils',
        component: TemporaryComponent
      },
      {
        path: 'teachers',
        component: TeachersComponent
      },
      {
        path: 'subjects',
        component: TemporaryComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AdminGuard, TeacherGuard, StudentGuard, LoginGuard]
})
// @ts-ignore
export class AppRoutingModule {}
// @ts-ignore
