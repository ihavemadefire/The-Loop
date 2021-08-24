from django.contrib import admin
from django.db.models.expressions import When
from.models import *

admin.site.site_header="The Loop Admin"

class TimeInline(admin.TabularInline):
    model = Time


class PlaceAdmin(admin.ModelAdmin):
    inlines = [TimeInline,]


class EventDateInline(admin.TabularInline):
    model = EventDate


class EventAdmin(admin.ModelAdmin):
    inlines = [EventDateInline,]

admin.site.register(Place, PlaceAdmin)
admin.site.register(District)
admin.site.register(Amenity)
admin.site.register(Type)
admin.site.register(SubType)
admin.site.register(Time)
admin.site.register(Event, EventAdmin)
admin.site.register(TypeEvent)
admin.site.register(EventDate)
