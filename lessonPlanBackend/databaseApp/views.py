from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse

from databaseApp.models import Professors,Dates,Groups,Lessons
from databaseApp.serializers import ProfessorSerializer,DateSerializer,GroupSerializer,LessonSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView


# Create your views here.

@csrf_exempt
def getAllProfessors(request):
    if request.method=='GET':
        professors = Professors.objects.all()
        professorSerializers=ProfessorSerializer(professors,many=True)
        return JsonResponse(professorSerializers.data,safe=False)

@csrf_exempt
def getProfessor(request,id=0):
    if request.method=='GET':
        professor = Professors.objects.all().get(ProfessorId=id)
        professorSerializer = ProfessorSerializer(professor)
        return JsonResponse(professorSerializer.data,safe=False)

@csrf_exempt
@login_required
def getAllLessons(request):
    if request.method=='GET':
        lessons = Lessons.objects.all()
        lessonSerializers=LessonSerializer(lessons,many=True)
        return JsonResponse(lessonSerializers.data,safe=False)

@csrf_exempt
def getLesson(request,id=0):
    if request.method=='GET':
        lesson = Lessons.objects.all().get(LessonId=id)
        lessonSerializer = LessonSerializer(lesson)
        return JsonResponse(lessonSerializer.data,safe=False)

@csrf_exempt
def getAllGroups(request):
    if request.method=='GET':
        groups = Groups.objects.all()
        groupSerializers=GroupSerializer(groups,many=True)
        return JsonResponse(groupSerializers.data,safe=False)

class getLessonsByGroup(APIView):
    permission_classes = (IsAuthenticated,)
    def get(self, request,id=0):
        if request.method=='GET':
            lessons = Lessons.objects.filter(Group_id=id)
            lessonSerializers = LessonSerializer(lessons, many=True)
            return JsonResponse(lessonSerializers.data,safe=False)

@csrf_exempt
def getProfessorLessons(request,id=0):
    if request.method=='GET':
        lessons = Lessons.objects.filter(Professor_id=id)
        lessonSerializers = LessonSerializer(lessons, many=True)
        return JsonResponse(lessonSerializers.data,safe=False)
