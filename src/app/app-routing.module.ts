import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { TeachersComponent } from './teachers/teachers.component';


const routes: Routes = [
  {
    path: '',
    component: LoginComponent
 },
 {
  path: 'teachers',
  component: TeachersComponent
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
