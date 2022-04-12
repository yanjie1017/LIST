from dataclasses import field
from rest_framework import serializers
from .models import Ticker_Symbol

class TickerSymbolSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ticker_Symbol
        fields = '__all__'
