import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatFormFieldModule, MatInputModule, MatCardModule, MatButtonModule, MatCheckboxModule, MatIconModule, 
  MatGridListModule, MatTableModule } from "@angular/material";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { FormsModule, ReactiveFormsModule } from "@angular/forms"
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { LoginComponent } from "./login/login.component";
import { httpInterceptorProviders } from './http-interceptor';
import { TeachersComponent } from './teachers/teachers.component';



@NgModule({
  declarations: [AppComponent, LoginComponent, TeachersComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatCheckboxModule,
    MatGridListModule,
    MatTableModule,
    BrowserAnimationsModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule {}
