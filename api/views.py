from datetime import datetime
from django.shortcuts import render
from django.contrib import messages
from django.http import HttpResponse
from django.utils import timezone
from rest_framework import views, viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, MultiPartParser
import io, csv
from datetime import datetime

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


# def get_timezone(original_datetime):
#         new_datetime = datetime.strptime(original_datetime, '%Y-%m-%d %H:%M:%S')
#         tz = timezone.utc
#         timzone_datetime = timezone.make_aware(new_datetime, tz, True)
#         return timzone_datetime.date()

# class UploadTickerSymbol(views.APIView):
#     parser_classes = (FormParser, MultiPartParser)

#     def post(self, request):
#         for file in request.FILES.values():
#             file = open('./hindalco.csv', "rt", encoding="UTF-8")
#             reader = csv.reader(file)
#             next(reader)
            # for row in reader:
            #     print(row[6])
            #     Ticker_Symbol.objects.create(
            #         datetime = get_timezone(row[0]),
            #         close = row[1],
            #         high = row[2],
            #         low = row[3],
            #         open = row[4],
            #         volume = row[5],
            #         instrument = row[6]
            #     )
        # return Response(status=200)

# def upload_csv_file(request):
#     try:
#         csv_file = request.FILES['file'] 
#         data_set = csv_file.read().decode('UTF-8')
#         io_string = io.String(data_set)
#         next(io_string) #skip the header line
#         for column in csv.reader(io_string, delimeter=',', quotechar='|'):
#             _, created = Ticker_Symbol.objects.update_or_create(
#                 datetime = column[0],
#                 close = column[1],
#                 high = column[2],
#                 low = column[3],
#                 open = column[4],
#                 volume = column[5],
#                 instrument = column[6]
#             )
#         return HttpResponse(status=200)
#     except:
#         return HttpResponse("File not uploaded", status=400)