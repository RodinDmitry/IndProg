from django.db import models


class Task(models.Model):
    text = models.TextField()
    creation_date = models.DateTimeField(auto_now_add=True)
    completed = models.BooleanField(default=False)
