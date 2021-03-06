from django.urls import path
from graphene_django.views import GraphQLView
from django.views.decorators.csrf import csrf_exempt
from api.schema import schema

urlpatterns = [
    path("___graphql", csrf_exempt(GraphQLView.as_view(graphiql=True, schema=schema)))
]