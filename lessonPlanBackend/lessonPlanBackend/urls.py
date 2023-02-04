"""lessonPlanBackend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, re_path, include, reverse_lazy
from django.views.generic import RedirectView, TemplateView

from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter


from databaseApp import views

import databaseApp
from users.views import UserViewSet, UserLogIn, UserCreate, ActivateUser, SecretView
from rest_framework.authtoken import views
from rest_framework_swagger.views import get_swagger_view

from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

router = DefaultRouter()
router.register(r'users', UserViewSet)
# schema_view = get_swagger_view(title='User API')

schema_view = get_schema_view(
    openapi.Info(
    title="ABC",
        default_version = 'v1',
    ),
    public=True,
    permission_classes = (permissions.IsAuthenticated,),
)

urlpatterns = [
    path('register/', UserCreate.as_view()),

    path('admin/', admin.site.urls),
    path('api/v1/', include(router.urls), name='after_login'),
    path('', TemplateView.as_view(template_name='base.html'), name='home'),
    path('api-user-login/', UserLogIn.as_view()),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('', RedirectView.as_view(url='api-auth/login')),
    re_path(r'^$', RedirectView.as_view(url=reverse_lazy('api-root'), permanent=False)),
    path('', include('databaseApp.urls')),
    path('activate/<uid>/<token>', ActivateUser.activate, name='activate'),
    path('secret/', SecretView.get_secret, name='secret'),
    path('schema/', schema_view.with_ui('swagger', cache_timeout=0),name='schema-swagger-ui'),

    path('professors',databaseApp.views.getAllProfessors),
    path(r'^professor/([0-9]+)$',databaseApp.views.getProfessor),
    path(r'^groups$',databaseApp.views.getAllGroups),
    path(r'^groups/([0-9]+)/lessons$',databaseApp.views.getLessonsByGroup.as_view()),
    path(r'^lessons/([0-9]+)$',databaseApp.views.getLesson),
    path(r'^lessons$',databaseApp.views.getAllLessons),
    path(r'^professors/([0-9]+)/lessons$',databaseApp.views.getProfessorLessons),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
