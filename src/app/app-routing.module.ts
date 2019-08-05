import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';
import { LoginComponent } from './pages/login/login.component';
import { AdminComponent } from './pages/admin/admin.component';
import { StudentsComponent } from './pages/student/students.component';
import { TeachersComponent } from './containers/teachers/teachers.component';
import { StudentDiaryComponent } from './containers/student-diary/student-diary.component';
import { TemporaryComponent } from './components/temporary/temporary.component';

const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'teachers',
    component: TeachersComponent
  },
  {
    path: 'student',
    component: StudentsComponent
  },
  {
    path: 'student/diary',
    component: StudentDiaryComponent
  },
  {
    path: 'admin',
    component: AdminComponent,
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
  exports: [RouterModule]
})
// @ts-ignore
export class AppRoutingModule {}
// @ts-ignore
