from django.db.models import fields
import graphene
from graphene_django import DjangoObjectType, DjangoListField
from .models import *


class DistrictType(DjangoObjectType):
    class Meta:
        model = District
        fields = ('id', 'district')

class PlaceType(DjangoObjectType):
    class Meta:
        model = Place
        fields = ('id', 'name', 'attribution', 'short_description', 'address', 'description', 'phone_number', 'price',
                  'district', 'amenities', 'open_now', 'type', 'subtype', 'lat', 'long' )


class TypeType(DjangoObjectType):
    class Meta:
        model = Type
        fields = ('id', 'type')


class AmenityType(DjangoObjectType):
    class Meta:
        model = Amenity
        fields = ('id', 'amenity')


class SubTypeType(DjangoObjectType):
    class Meta:
        model = SubType
        fields = ('id', 'subtype')


class TimeType(DjangoObjectType):
    class Meta:
        model = Time
        fields = ('id', 'day', 'time', 'open_close', 'place')


class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = ('id' ,'name', 'attribution', 'short_description', 'type', 'venue', 'recurring', 'active', 'description', 'tix_required', 'tix_link')


class TypeEventType(DjangoObjectType):
    class Meta:
        model = TypeEvent
        fields = ('id', 'type')


class EventDateType(DjangoObjectType):
    class Meta:
        model = EventDate
        fields = ('id', 'date', 'time', 'where')


class Query(graphene.ObjectType):
    all_places = graphene.List(PlaceType)
    all_events = graphene.List(EventType)
    one_place = graphene.Field(PlaceType, id=graphene.Int())
    one_event = graphene.Field(EventType, id=graphene.Int())
    
    def resolve_all_places(self, info):
        return Place.objects.all()

    def resolve_all_events(self, info):
        return Event.objects.all()

    def resolve_one_place(self, info, id):
        return Place.objects.get(pk=id)
    
    def resolve_one_event(self, info, id):
        return Event.objects.get(pk=id)
        
schema = graphene.Schema(query=Query)