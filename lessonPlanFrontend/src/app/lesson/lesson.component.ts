import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
import { LessonDisplayed } from '../interfaces/lesson-displayed';

@Component({
  selector: 'lesson',
  templateUrl: './lesson.component.html',
  styleUrls: ['./lesson.component.scss'],
})
export class LessonComponent implements OnInit {
  @Input() lesson: LessonDisplayed = {
    startTime: new Date('January 1, 2000 13:00'),
    endTime: new Date('January 1, 2000 16:30'),
    dayOfWeek: 'Pon',
    isEven: true,
    name: 'Inżynieria Kwantowa',
    className: 'Lab DE',
    professorName: 'Krzysztof Werner',
    professorId: 6,
    positiveIndent: 1,
    negativeIndent: -1,
  };
  // {
  //   startTime: new Date('January 1, 2000 9:15'),
  //   endTime: new Date('January 1, 2000 10:45'),
  //   dayOfWeek: 'Pon',
  //   isEven: false,
  //   name: 'Inżynieria Kantowa',
  //   className: 'Lab BC',
  //   professorName: 'Krzysztof Werner',
  //   professorId: 2,
  // }

  public percentageHeight: string = '0%';

  public percentageTop: string = '0%';

  public percentageLeft: string = '5%';

  public percentageWidth: string = '90%';

  public startHour: string = '';

  public finishHour: string = '';

  public backgroundColor: string = 'rgb(255, 255, 255)';

  constructor() {}

  ngOnInit(): void {
    let hours =
      (this.lesson.endTime.getTime() - this.lesson.startTime.getTime()) /
      3600000;
    this.percentageHeight = (hours * 100) / 15 + '%';

    let startTime =
      (this.lesson.startTime.getTime() -
        new Date('January 1, 2000 7:00').getTime()) /
      3600000;

    this.percentageTop = (startTime * 100) / 15 + '%';

    this.startHour = moment(this.lesson.startTime).format('HH:mm');

    this.finishHour = moment(this.lesson.endTime).format('HH:mm');

    if (this.lesson.positiveIndent >= 6) {
      this.percentageLeft = '65%';
    } else {
      this.percentageLeft = 5 + 10 * this.lesson.positiveIndent + '%';
    }

    if (this.lesson.positiveIndent - this.lesson.negativeIndent >= 6) {
      this.percentageWidth = '30%';
    } else {
      this.percentageWidth =
        90 -
        10 * this.lesson.positiveIndent +
        10 * this.lesson.negativeIndent +
        '%';
    }

    this.backgroundColor =
      'rgb(' +
      (235 + Math.floor(Math.random() * 20)) +
      ',' +
      (235 + Math.floor(Math.random() * 20)) +
      ',' +
      (235 + Math.floor(Math.random() * 20)) +
      ')';
  }
}
