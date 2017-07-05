from django.db import models

class Contacts(models.Model):
    user = models.ForeignKey('auth.User')
    name = models.CharField(max_length=15,default="")
    mobile = models.CharField(max_length=10,default="")
    address = models.TextField()

    def __str__(self):
        return self.name
