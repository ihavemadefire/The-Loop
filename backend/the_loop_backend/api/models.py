from django.db import models
from django.db.models.deletion import CASCADE
from django.db.models.fields import CharField
from django.db.models.fields.related import ManyToManyField

# Create your models here.


class District(models.Model):
    district = models.CharField(max_length=25)

    def __str__(self):
        return self.district + " District"


class Amenities(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class Type(models.Model):
    type = models.CharField(max_length=40)

    def __str__(self):
        return self.type

class SubType(models.Model):
    SubType = models.CharField(max_length=40)

    def __str__(self):
        return self.SubType

class Place(models.Model):
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=100)
    description = models.TextField()
    phone_number = models.CharField(max_length=14)
    price_choices = [
        ('$', '$'),
        ('$$', '$$'),
        ('$$$', '$$$'),
        ('$$$$', '$$$$')
    ]
    price = models.CharField(max_length=5, default=1, choices=price_choices)
    district = models.ForeignKey(District, on_delete=models.CASCADE, null=True)
    amenities = ManyToManyField(Amenities)
    type = models.ForeignKey(Type, on_delete=CASCADE)
    subtype = ManyToManyField(SubType)
    
    def __str__(self):
        return self.name