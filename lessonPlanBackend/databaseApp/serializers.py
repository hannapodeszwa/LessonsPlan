from rest_framework import serializers
from databaseApp.models import Professors,Dates,Groups,Lessons

class ProfessorSerializer(serializers.ModelSerializer):
    class Meta:
        model=Professors
        fields=('ProfessorId','ProfessorName','ProfessorDegree')

class DateSerializer(serializers.ModelSerializer):
    class Meta:
        model=Dates
        fields=('DateId','WeekType','Day','Hour')

class GroupSerializer(serializers.ModelSerializer):
    class Meta:
        model=Groups
        fields=('GroupId','CourseName','Level','Semester')

class LessonSerializer(serializers.ModelSerializer):
    Date = DateSerializer()
    Professor = ProfessorSerializer()
    class Meta:
        model=Lessons
        fields=['LessonId','LessonName','Class','Date','Professor','Group']