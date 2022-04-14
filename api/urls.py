from django.urls import path, include
from rest_framework import routers
from .views import TickerSymbolViewSet

router = routers.DefaultRouter()
router.register('tickersymbol', TickerSymbolViewSet)
list_specific = TickerSymbolViewSet.as_view({'get':'list_specific'})
list_option = TickerSymbolViewSet.as_view({'get':'list_option'})

urlpatterns = [
    path('', include(router.urls)),
    path('tickersymbol/option', list_option),
    path('tickersymbol/option/<str:pk>', list_specific),
]