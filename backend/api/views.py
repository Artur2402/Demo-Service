from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404


from .serializers import CompanySerializers
from .models import Company


class CompanyViewSet(viewsets.ModelViewSet):
  queryset = Company.objects.all()
  serializer_class = CompanySerializers
  
  def get_queryset(self):
    queryset = super().get_queryset()
    queryparams = self.request.GET
    
    #Фильтры
    name = queryparams.get('name')
    inn = queryparams.get('inn')
    ogrn = queryparams.get('ogrn')
    status = queryparams.get('status')
    activity = queryparams.get('activity')
    
    if name:
      queryset = queryset.filter(name__icontains=name)
    if inn:
      queryset = queryset.filter(inn__icontains=inn)
    if ogrn:
      queryset = queryset.filter(ogrn__icontains=ogrn)
    if status:
      queryset = queryset.filter(status__icontains=status)
    if activity:
      queryset = queryset.filter(activity__icontains=activity)
    
    return queryset