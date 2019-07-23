import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { LoginComponent } from "./login/login.component";
import { TeachersComponent } from "./teachers/teachers.component";
import { StudentsComponent } from './students/students.component';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  {
    path: "",
    component: LoginComponent
  },
  {
    path: "teachers",
    component: TeachersComponent
  },
  {
    path: "students",
    component: StudentsComponent
  },
  {
    path: "admin",
    component: AdminComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
