from django.db.models import fields
import graphene
from graphene_django import DjangoObjectType, DjangoListField
from .models import *
from graphene import relay


class DistrictType(DjangoObjectType):
    class Meta:
        model = District
        fields = ('id', 'district')

class PlaceType(DjangoObjectType):
    class Meta:
        model = Place
        interfaces = (relay.Node,)
        fields = ('id', 'name', 'attribution', 'short_description', 'address', 'description', 'phone_number', 'price',
                  'district', 'amenities', 'open_now', 'type', 'subtype', 'lat', 'long', 'image')


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
        interfaces = (relay.Node,)
        fields = ('id', 'day', 'time', 'open_close', 'place')


class EventType(DjangoObjectType):
    class Meta:
        model = Event
        fields = ('id' ,'name', 'attribution', 'short_description', 'when', 'end','type', 'venue', 'recurring', 'active', 'description', 'tix_required', 'tix_link', 'image')


class TypeEventType(DjangoObjectType):
    class Meta:
        model = TypeEvent
        fields = ('id', 'type')


class EventDateType(DjangoObjectType):
    class Meta:
        model = EventDate
        fields = ('id', 'date', 'time', 'where')


class TimePlaceUnion(graphene.Union):
    class Meta:
        types = (PlaceType, TimeType)

class PlacesType(graphene.ObjectType):
    class Meta:
        fields = ('id', 'name', 'attribution', 'short_description', 'address', 'description', 'phone_number', 'price',
                  'district', 'amenities', 'open_now', 'type', 'subtype', 'lat', 'long', 'image', 'times')

class Query(graphene.ObjectType):
    all_places = graphene.List(PlaceType)
    all_events = graphene.List(EventType)
    one_place = graphene.Field(PlaceType, id=graphene.Int())
    one_event = graphene.Field(EventType, id=graphene.Int())
    all_times = graphene.List(TimeType)
    all_times_place = graphene.List(TimeType, id=graphene.ID())
    all_dates_event = graphene.List(EventDateType, id=graphene.ID())
    all_places_and_times = graphene.List(TimePlaceUnion)
    PlacesType = graphene.List(PlaceType)

    def resolve_all_places(self, info):
        return Place.objects.order_by('id')

    def resolve_all_events(self, info):
        return Event.objects.all()

    def resolve_one_place(self, info, id):
        return Place.objects.get(pk=id)
    
    def resolve_one_event(self, info, id):
        return Event.objects.get(pk=id)

    def resolve_all_times(self, info):
        return Time.objects.all()

    def resolve_all_times_place(self, info, id):
        return Time.objects.filter(place=id)

    def resolve_all_dates_event(self, info, id):
        return EventDate.objects.filter(id=id)

    def resolve_all_places_and_times(self, info):
        queryset1 = Place.objects.all()
        queryset2 = Time.objects.all()
        places = queryset1.order_by('id').values()
        times = queryset2.values()
        for i in places:
            place_id = (i['id'])
            ind_of_times = next((i for (i, d) in enumerate(times) if d["place_id"] == place_id), 0)
            i['times']=times[ind_of_times]
        print(places)
        print(type(queryset1))
        print(type(places))
        return [*queryset2, *queryset1 ]

schema = graphene.Schema(query=Query)