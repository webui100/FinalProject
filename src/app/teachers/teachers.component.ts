import { Teacher } from "./../models/teacher";
import { TeachersService } from "./../services/teachers.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: "webui-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.scss"]
})
export class TeachersComponent implements OnInit {
  constructor(private teachers: TeachersService) {}

  displayedColumns: string[] = [
    "firstname",
    "lastname",
    "patronymic",
    "dateOfBirth"
  ];
  teachersList;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  getTeachers() {
    this.teachers.getTeachers().subscribe(response => {
      this.teachersList = new MatTableDataSource<Teacher>(response.data);
      this.teachersList.paginator = this.paginator;
      this.teachersList.sort = this.sort;
      
    });
  }
  
  applyFilter(filterValue: string) {
    this.teachersList.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getTeachers();
  }
  ngAfterViewInit(){
    this.teachersList.sort = this.sort;
  }
}
