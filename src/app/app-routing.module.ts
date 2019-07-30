import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TeachersComponent } from './containers/admin-panel/teachers/teachers.component';
import { StudentsComponent } from './pages/students/students.component';
import { AdminComponent } from './containers/admin-panel/admin.component';
import { TemporaryComponent } from './temporary/temporary.component';
import { StudentDiaryComponent } from './containers/student-panel/student-diary/student-diary.component';

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
    path: 'students',
    component: StudentsComponent
  },
  {
    path: 'students/diary',
    component: StudentDiaryComponent
  },
  {
    path: 'admin-panel',
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'pupils',
        pathMatch: 'full'
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
      },
      {
        path: 'classes',
        component: TemporaryComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
