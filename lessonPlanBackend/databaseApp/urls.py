from django.urls import re_path as url
from rest_framework import permissions

from databaseApp import views

from django.conf.urls.static import static
from django.conf import settings
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
    openapi.Info(
    title="ABC",
        default_version = 'v1',
    ),
    public=True,
    permission_classes = (permissions.AllowAny,),
)

urlpatterns=[
    url(r'^professors$',views.getAllProfessors),
    url(r'^professor/([0-9]+)$',views.getProfessor),
    url(r'^groups$',views.getAllGroups),
    url(r'^groups/([0-9]+)/lessons$',views.getLessonsByGroup.as_view()),
    url(r'^lessons/([0-9]+)$',views.getLesson),
    url(r'^lessons$',views.getAllLessons),
    url(r'^professors/([0-9]+)/lessons$',views.getProfessorLessons),
    url(r'^schema2/', schema_view.with_ui('swagger', cache_timeout=0),name='schema-swagger-ui'),
]