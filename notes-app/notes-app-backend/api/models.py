from django.db import models

# Create your models here.
class Note(models.Model):
    body = models.TextField(null=True, blank=True)
    dateCreated = models.DateField(auto_now_add=True)
    dateUpdated = models.DateField(auto_now=True)

    def __str__(self):
        if len(self.body) >= 50:
            return self.body[:50] + '...'
        return self.body