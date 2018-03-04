from django.shortcuts import render
from rest_framework import viewsets, generics
from backend.models import Task
from backend.serializers import TaskSerializer


class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer


class TaskDetail(generics.DestroyAPIView):
    queryset = Task.objects.all()
    model = Task
    serializer_class = TaskSerializer
