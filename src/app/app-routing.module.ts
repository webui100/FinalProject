import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TeachersComponent } from "./teachers/teachers.component";
import { StudentsComponent } from './students/students.component';
import { AdminComponent } from './admin/admin.component';
import {TemporaryComponent} from './temporary/temporary.component';
import {AdminGuard} from "./services/guards/admin.guard";
import {TeacherGuard} from "./services/guards/teacher.guard";
import {StudentGuard} from "./services/guards/student.guard";

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: 'teachers',
    component: TeachersComponent,
    canActivate: [TeacherGuard]
  },
  {
    path: 'students',
    component: StudentsComponent,
    canActivate: [StudentGuard]
  },
  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AdminGuard],
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
        component: TemporaryComponent
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
  exports: [RouterModule],
  providers: [AdminGuard, TeacherGuard, StudentGuard]
})
export class AppRoutingModule {}
