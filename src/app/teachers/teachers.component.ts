import { Store, select } from "@ngrx/store";
import { Teacher } from "./../models/teacher";
import { TeachersService } from "./../services/teachers.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { selectAll } from "../store/teachers/teachers.selector";

@Component({
  selector: "webui-teachers",
  templateUrl: "./teachers.component.html",
  styleUrls: ["./teachers.component.scss"]
})
export class TeachersComponent implements OnInit {
  private data$: any;
  data: any;

  constructor(
    private teachers: TeachersService,
    private store: Store<{ teachers }>
  ) {
    this.data$ = this.store.pipe(select(selectAll));
  }

  displayedColumns: string[] = [
    "firstname",
    "lastname",
    "patronymic",
    "dateOfBirth"
  ];
  private teachersList: any;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  getTeachers() {
    this.data$.subscribe(response => {
      this.data = response;
      this.teachersList = new MatTableDataSource<Teacher>(this.data);
      this.teachersList.paginator = this.paginator;
      this.teachersList.sort = this.sort;
    });
    if (!this.data) {
      this.teachers.getTeachers();
    }
  }

  private applyFilter(filterValue: string) {
    this.teachersList.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit() {
    this.getTeachers();
  }

  ngOnDestroy(): void {
    this.data$.unsubscribe()
    
  }
}
