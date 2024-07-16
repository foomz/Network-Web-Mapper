from django.urls import path
from .views import run_command_view

urlpatterns = [
    path('run-command/', run_command_view, name='run-command'),
]
