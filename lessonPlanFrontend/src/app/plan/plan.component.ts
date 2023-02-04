import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { map } from 'rxjs';
import { LessonDisplayed } from '../interfaces/lesson-displayed';
import { PlanService } from '../services/plan.service';
import { DaysOfWeek } from '../enums/days-of-week';

@Component({
  selector: 'plan',
  templateUrl: './plan.component.html',
  styleUrls: ['./plan.component.scss'],
})
export class PlanComponent implements OnInit {
  constructor(private _planService: PlanService) {}

  public isAuthorized = false;

  public lessons: LessonDisplayed[] = [];
  public lessonsByDay: LessonDisplayed[][] = [];

  ngOnInit() {
    this._planService
      .getLessonsByGroup(4)
      .pipe(
        map((lessons) =>
          lessons.map((lesson) => {
            return {
              startTime: new Date(`January 1, 2000 ${lesson.Date.Hour}`),
              endTime: moment(`January 1, 2000 ${lesson.Date.Hour}`)
                .add(3, 'hours')
                .toDate(),
              dayOfWeek: lesson.Date.Day,
              isEven: lesson.Date.WeekType === 'PARZYSTY',
              name: lesson.LessonName,
              className: lesson.Class,
              professorName:
                lesson.Professor.ProfessorDegree +
                ' ' +
                lesson.Professor.ProfessorName,
              professorId: lesson.Professor.ProfessorId,
              positiveIndent: 0,
              negativeIndent: 0,
            };
          })
        )
      )
      .subscribe(
        (result) => {
          this.lessons = result;
          this.isAuthorized = true;
          this.prepareLessonPlan();
        },
        (error) => {
          this.isAuthorized = false;
        }
      );
  }

  private prepareLessonPlan() {
    this.lessonsByDay[DaysOfWeek.PONIEDZIALEK] = this.lessons.filter(
      (lesson) => lesson.dayOfWeek == 'PONIEDZIAŁEK'
    );
    this.lessonsByDay[DaysOfWeek.WTOREK] = this.lessons.filter(
      (lesson) => lesson.dayOfWeek == 'WTOREK'
    );
    this.lessonsByDay[DaysOfWeek.SRODA] = this.lessons.filter(
      (lesson) => lesson.dayOfWeek == 'ŚRODA'
    );
    this.lessonsByDay[DaysOfWeek.CZWARTEK] = this.lessons.filter(
      (lesson) => lesson.dayOfWeek == 'CZWARTEK'
    );
    this.lessonsByDay[DaysOfWeek.PIATEK] = this.lessons.filter(
      (lesson) => lesson.dayOfWeek == 'PIĄTEK'
    );

    this.lessonsByDay.forEach((lessons) => {
      lessons.sort((l1, l2) => l1.startTime.getTime() - l2.startTime.getTime());

      for (let i = 0; i < lessons.length; i++) {
        for (let j = 0; j < i; j++) {
          if (
            lessons[j].endTime.getTime() > lessons[i].startTime.getTime() &&
            lessons[j].dayOfWeek == lessons[i].dayOfWeek
          ) {
            for (let k = 1; k <= lessons[j].positiveIndent; ) {
              if (lessons[j].dayOfWeek == lessons[i].dayOfWeek) {
                lessons[j - k].negativeIndent += -1;
                k++;
              }
            }

            lessons[j].negativeIndent += -1;
            lessons[i].positiveIndent = lessons[j].positiveIndent;
            lessons[i].positiveIndent += 1;
          }
        }
      }
    });
  }
}
