from django.urls import path, include
from rest_framework import routers
from .views import TickerSymbolViewSet

router = routers.DefaultRouter()
router.register('tickersymbol', TickerSymbolViewSet)

urlpatterns = [
    path('', include(router.urls)),
]