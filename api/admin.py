from django.contrib import admin
from .models import Ticker_Symbol

# Register your models here.
class TickerSymbolAdmin(admin.ModelAdmin):
    list_display = ('datetime', 'close', 'high', 'low', 'open', 'volume', 'instrument')

admin.site.register(Ticker_Symbol)