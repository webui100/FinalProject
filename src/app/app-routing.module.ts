import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TeachersComponent } from './containers/teachers/teachers.component';
import { StudentsComponent } from './pages/students/students.component';
import { AdminComponent } from './pages/admin/admin.component';
import { TemporaryComponent } from './components/temporary/temporary.component';
import { StudentDiaryComponent } from './containers/student-diary/student-diary.component';

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
