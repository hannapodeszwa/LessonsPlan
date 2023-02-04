import { LessonDate } from './lesson-date';
import { Professor } from './professor';

export interface Lesson {
  Class: string;
  Date: LessonDate;
  Group: number;
  LessonId: number;
  LessonName: string;
  Professor: Professor;
}
