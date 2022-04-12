from datetime import datetime
from django.db import models

# Create your models here.
class Ticker_Symbol(models.Model):
    datetime = models.DateTimeField()
    close = models.DecimalField(max_digits=6, decimal_places=2)
    high = models.DecimalField(max_digits=6, decimal_places=2)
    low = models.DecimalField(max_digits=6, decimal_places=2)
    open = models.DecimalField(max_digits=6, decimal_places=2)
    volume = models.IntegerField()
    instrument = models.CharField(max_length=50)
