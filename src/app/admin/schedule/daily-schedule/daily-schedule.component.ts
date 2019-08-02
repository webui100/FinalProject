import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { TeachersService } from 'src/app/services/teachers.service';
import { selectAll as selectAllTeachers } from 'src/app/store/teachers/teachers.selector';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'webui-daily-schedule',
  templateUrl: './daily-schedule.component.html',
  styleUrls: ['./daily-schedule.component.scss']
})
export class DailyScheduleComponent implements OnInit {
  formDailySchedule: FormGroup;
  secondGroupVisible: boolean[] = [];
  teachersVisible: boolean[] = [];
  dailySchedule: FormArray;

  teacher = new FormControl(); //array
  teachers: string[] = [];
  teachersTemp$: any;
  filteredTeachers: Observable<string[]>;

  lessonsMaxPerDay = 8;

  @Input() lesson: {};
  @Input() dayOfWeek: string;
  @Input() subjects: [];

  @Output() addDailySubjects: EventEmitter<FormArray> = new EventEmitter();

  constructor(private formBuilder: FormBuilder,
              private teachersObj: TeachersService,
              private storeTeachers: Store<{ teachers }>) {
    this.teachersTemp$ = this.storeTeachers.pipe(select(selectAllTeachers));

              }

  ngOnInit() {
    this.addDailySubjects.emit(this.dailySchedule);
    this.buildDailySchedul();

    this.teachersTemp$.subscribe(res => {
      if (!res) {
        this.teachersObj.getTeachers();
      }
      for (const key in res) {
        if (res.hasOwnProperty(key)) {
          const teacher = res[key];
          this.teachers.push(
                `${teacher.lastname} ${teacher.firstname} ${teacher.patronymic} ${teacher.id}`
              );
        }
      }
    });

    for (let i = 0; i < this.lessonsMaxPerDay; i++) {
      this.secondGroupVisible.push(false);
    }
  }

  /** Method initializes the initial state of the component's template */
  buildDailySchedul() {
    this.formDailySchedule = this.formBuilder.group({
      dailySchedule: this.formBuilder.array([
        this.formBuilder.group({
          firstGroup: this.formBuilder.control(''),
          secondGroup: this.formBuilder.control(''),
          firstGroupTeacher: this.formBuilder.control(''),
          secondGroupTeacher: this.formBuilder.control('')
        })
      ])
    });
  }

  get dailyShedule() {
    return this.formDailySchedule.get('dailySchedule');
  }

  addLesson(lessonNumber) {
    if (lessonNumber < (this.lessonsMaxPerDay - 1) && this.dailySchedule.length === lessonNumber + 1) {
      this.dailySchedule.push(this.formBuilder.group({
        firstGroup: this.formBuilder.control(''),
        secondGroup: this.formBuilder.control(''),
        firstGroupTeacher: this.formBuilder.control(''),
        secondGroupTeacher: this.formBuilder.control('')
      }));
    }
    // console.log(this.dailySchedule.value[lessonNumber].firstGroup);
  }

  removeLesson(lessonNumber) {
    this.dailySchedule.removeAt(lessonNumber);
    this.removeSecondGroup(lessonNumber);
    this.removeTeacher(lessonNumber);
    if (lessonNumber === (this.lessonsMaxPerDay - 1)) {
      this.addLesson(lessonNumber - 1);
    }
  }

  addSecondGroup(lessonNumber: number): void {
    this.secondGroupVisible[lessonNumber] = true;
    console.log(this.dailySchedule.value[lessonNumber].firstGroup);
  }

  removeSecondGroup(lessonNumber) { //онулювати значення "предмет" 2-ї групи
    this.secondGroupVisible[lessonNumber] = false;
  }

  keyUp(lessonNumber) {
    console.log(lessonNumber/*, typeof this.dailySchedule.value[lessonNumber].firstGroupTeacher.valueChanges*/);
  }

  addTeacherToLesson(lessonNumber) {
    this.teachersVisible[lessonNumber] = true;

    this.filteredTeachers = this.dailySchedule.value[lessonNumber].firstGroupTeacher.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value, this.teachers))
      );
  }

  removeTeacher(lessonNumber) { //онулювати значення "вчитель"
    this.teachersVisible[lessonNumber] = false;
  }

  private _filter(value: string, arr: any[]): string[] {
    const filterValue = value.toLowerCase();
    if (typeof (arr[0]) === 'number') {
      arr.map((item, index) => arr[index] = item.toString());
    }
    return arr.filter(option => option.toLowerCase().includes(filterValue));
  }

}
