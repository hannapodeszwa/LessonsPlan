from django.db import models

# Create your models here.

class Professors(models.Model):
    ProfessorId = models.AutoField(primary_key=True)
    ProfessorName = models.CharField(max_length=100)
    ProfessorDegree = models.CharField(max_length=20)

class Dates(models.Model):
    DateId = models.AutoField(primary_key=True)
    WeekType = models.CharField(max_length=20)
    Day = models.CharField(max_length=20)
    Hour = models.CharField(max_length=20)

class Groups(models.Model):
    GroupId = models.AutoField(primary_key=True)
    CourseName = models.CharField(max_length=50)
    Level = models.CharField(max_length=20)
    Semester = models.CharField(max_length=1)

class Lessons(models.Model):
    LessonId = models.AutoField(primary_key=True)
    LessonName = models.CharField(max_length=100)
    Class = models.CharField(max_length=20)
    Date = models.ForeignKey(Dates, on_delete=models.CASCADE)
    Professor = models.ForeignKey(Professors, on_delete=models.CASCADE)
    Group = models.ForeignKey(Groups, on_delete=models.CASCADE)