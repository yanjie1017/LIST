from datetime import datetime
from django.db import models

# Create your models here.
class Ticker_Symbol(models.Model):
    datetime = models.DateTimeField(null=False, blank=False)
    close = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    high = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    low = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    open = models.DecimalField(max_digits=6, decimal_places=2, null=False, blank=False)
    volume = models.IntegerField(null=False, blank=False)
    instrument = models.CharField(max_length=50, null=False, blank=False)

    class Meta:
        ordering = ('instrument', 'datetime')

    def save(self, *args, **kwargs):
        self.instrument = self.instrument.upper()
        super(Ticker_Symbol, self).save(*args, **kwargs)