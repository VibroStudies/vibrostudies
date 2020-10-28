from django.urls import include, path
from rest_framework import routers
from . import views

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path(r'StudyNew/<pk>/', views.studyView),
    path(r'Result/<pk>/', views.resultView),
    path(r'AvailableStudies/', views.availableStudies),
    path(r'MyStudies/<uk>/', views.myStudies),
    path(r'ParticipatedStudies/<uk>/', views.participatedStudies),
    path(r'SaveStudy/', views.saveStudy),
    path(r'SaveUser/', views.saveUser),
    path(r'Login/', views.loginUser),
    path(r'VerifyUser/', views.verifyUser),
    path(r'User/<uk>/', views.getUser),
    path(r'DeleteStudy/<pk>/', views.deleteStudy),
    path(r'DeleteUser/<uk>/', views.deleteUser),
    path(r'SaveResult/', views.saveResult),
    path(r'StartStudy/', views.startStudy),
    path(r'UpdateStudyState/<pk>/', views.updateStudyStatus),
    path(r'CheckPassword/', views.checkPassword),
]