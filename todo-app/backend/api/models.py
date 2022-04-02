from django.db import models

# Create your models here.
class Todo(models.Model):
    topic = models.CharField(max_length=50)
    dateCreated = models.DateField(auto_now=True)
    dateUpdated = models.DateField(auto_now_add=True)
    body = models.TextField()

    def __str__(self):
        if len(self.topic) > 25:
            return self.topic[:24] + '...'
        return self.topic