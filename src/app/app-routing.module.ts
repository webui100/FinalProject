import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeachersComponent } from './teachers/teachers.component';
import { StudentsComponent } from './students/students.component';
import { AdminComponent } from './admin/admin.component';
import { TemporaryComponent } from './temporary/temporary.component';
import { StudentDiaryComponent } from './components/student-diary/student-diary.component';
import {AdminPanelComponent} from './components/admin-panel/admin-panel.component';

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
