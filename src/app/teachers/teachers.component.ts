import { TeachersService } from './../services/teachers.service';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'webui-teachers',
  templateUrl: './teachers.component.html',
  styleUrls: ['./teachers.component.scss']
})
export class TeachersComponent implements OnInit {
  constructor(private teachers: TeachersService) { }
  teachersList = [];

  getTeachers(){
    this.teachers.getTeachers().subscribe(response =>{
      //@ts-ignore
      this.teachersList = response.data
    })
  }

 ngOnInit() {
  this.getTeachers()
  
  }

}
