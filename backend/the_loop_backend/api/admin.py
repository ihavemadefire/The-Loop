from django.contrib import admin
from.models import *

admin.site.site_header="What's Good Admin"

class TimeInline(admin.TabularInline):
    model = Time


class PlaceAdmin(admin.ModelAdmin):
    inlines = [TimeInline,]

admin.site.register(Place, PlaceAdmin)
admin.site.register(District)
admin.site.register(Amenities)
admin.site.register(Type)
admin.site.register(SubType)