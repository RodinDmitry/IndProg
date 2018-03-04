from rest_framework import serializers
from backend.models import Task


class TaskSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Task
        fields = ('id', 'text', 'creation_date', 'completed')