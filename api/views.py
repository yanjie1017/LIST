from django.shortcuts import render
from rest_framework import generics, viewsets, status
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Ticker_Symbol
from .serializers import TickerSymbolSerializer
import numpy as np

# Create your views here.
class TickerSymbolViewSet(viewsets.ModelViewSet):
    queryset = Ticker_Symbol.objects.all()
    serializer_class = TickerSymbolSerializer

    def list(self, request, *args, **kwargs):
        return super().list(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

    @action(methods=["GET"], detail=False)
    def list_specific(self, request, *args, **kwargs):
        intrument_name = kwargs['pk']
        queryset = self.get_queryset().filter(instrument=intrument_name).order_by('datetime')
        serializer = self.get_serializer(queryset, many=True)
        return Response(serializer.data)

    @action(methods=["GET"], detail=False)
    def list_option(self, request, *args, **kwargs):
        options = self.get_queryset().values_list('instrument', flat=True).distinct('instrument')  
        return Response(options)