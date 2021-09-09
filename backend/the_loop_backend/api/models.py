from django.db import models
from django.db.models.base import Model
from django.db.models.deletion import CASCADE
from django.db.models.expressions import Case
from django.db.models.fields import CharField
from django.db.models.fields.related import ManyToManyField


class District(models.Model):
    district = models.CharField(max_length=25)

    def __str__(self):
        return self.district + " District"


class Amenity(models.Model):
    amenity = models.CharField(max_length=30)

    class Meta:
        verbose_name_plural = "Amenities"

    def __str__(self):
        return self.amenity

class Type(models.Model):
    type = models.CharField(max_length=40)

    def __str__(self):
        return self.type

class SubType(models.Model):
    subtype = models.CharField(max_length=40)

    def __str__(self):
        return self.subtype

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
    open_now = models.BooleanField()
    district = models.ForeignKey(District, on_delete=models.CASCADE, null=True)
    amenities = ManyToManyField(Amenity)
    type = models.ForeignKey(Type, on_delete=CASCADE)
    subtype = ManyToManyField(SubType)
    lat = models.FloatField(default=36.1565497)
    long = models.FloatField(default=-95.9950548)
    
    def __str__(self):
        return self.name

class Time(models.Model):
    day_choices = [
        ('monday', 'Monday'),
        ('tuesday', 'Tuesday'),
        ('wednesday', 'Wednesday'),
        ('thursday', 'Thursday'),
        ('friday', 'Friday'),
        ('saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    ]
    day = models.CharField(max_length=12, choices=day_choices)
    time = models.TimeField()
    o_c_choices = [
        (True, 'Open'),
        (False, 'Close')
    ]
    open_close = models.BooleanField(choices=o_c_choices)
    place = models.ForeignKey(Place, null=True ,on_delete=CASCADE)

    def __str__(self):
        o_c = "Close"
        if self.open_close:
            o_c = "Open"
        return self.day + ' | ' + str(self.time) + ' | ' + o_c


class TypeEvent(models.Model):
    type = models.CharField(max_length=25)

    def __str__(self):
        return self.type


class Event(models.Model):
    name = models.CharField(max_length=150)
    type = ManyToManyField(TypeEvent)
    venue = models.ForeignKey(Place, on_delete=CASCADE)
    recurring = models.BooleanField()
    active = models.BooleanField()
    description = models.TextField()
    tix_required = models.BooleanField()
    tix_link = models.URLField(null=True)

    def __str__(self):
        return self.name


class EventDate(models.Model):
    date = models.DateField(null=True)
    time = models.TimeField(null=True)
    where = models.ForeignKey(Event, null=True, on_delete=CASCADE)

    def __str__(self):
        return str(self.date) + ' ' + str(self.time)