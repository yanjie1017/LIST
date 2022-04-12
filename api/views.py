from django.shortcuts import render
from rest_framework import generics, viewsets, status
from .models import Ticker_Symbol
from .serializers import TickerSymbolSerializer

# Create your views here.
class TickerSymbolViewSet(viewsets.ModelViewSet):
    queryset = Ticker_Symbol.objects.all()
    serializer_class = TickerSymbolSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)