from django.http.response import JsonResponse
from django.views.generic.base import View
from .serializers import SaleSerializer, SellerSerializer
from .models import Seller, Sale
from rest_framework import generics
from django.db.models import Sum
from django.core.paginator import EmptyPage, PageNotAnInteger, Paginator
import math


class ListSellers(generics.ListAPIView):
  pagination_class = None
  queryset = Seller.objects.all()
  serializer_class = SellerSerializer


class ListSales(generics.ListAPIView):

  serializer_class = SaleSerializer

  def get_queryset(self):
    queryset = Sale.objects.select_related("seller").all()
    return queryset


def data_donut(request):
  dataset = Sale.objects.values('seller','seller__name').annotate(samount=Sum('amount'))
  data_serializer = [{
      "seller": d['seller__name'],
      "sum_amount": float(d['samount'])
  } for d in dataset]
  return JsonResponse(data_serializer, safe=False)

def data_bar_chart(request):
    dataset = Sale.objects.values('seller__name').annotate(sum_visited=Sum('visited'),
                                 sum_deals=Sum('deals'))
    data_serializer = [{
      "seller": d['seller__name'],
      "sum_visited": d['sum_visited'],
      "sum_deals": d['sum_deals']
    } for d in dataset]
    return JsonResponse(data_serializer, safe=False)
  
class ViewPaginatorMixin(object):
    min_limit = 1
    max_limit = 10

    def paginate(self, object_list, page=1, limit=10, **kwargs):
        try:
            page = int(page)
            if page < 1:
                page = 1
        except (TypeError, ValueError):
            page = 1

        try:
            limit = int(limit)
            if limit < self.min_limit:
                limit = self.min_limit
            if limit > self.max_limit:
                limit = self.max_limit
        except (ValueError, TypeError):
            limit = self.max_limit

        paginator = Paginator(object_list, limit)
        try:
            objects = paginator.page(page)
        except PageNotAnInteger:
            objects = paginator.page(1)
        except EmptyPage:
            objects = paginator.page(paginator.num_pages)
        data = {
            'count': len(object_list),
            'total_pages': math.ceil(len(object_list)/limit),
            'previous_page': objects.has_previous() and objects.previous_page_number() or None,
            'current_page': page,
            'next_page': objects.has_next() and objects.next_page_number() or None,
            'content': list(objects)
        }
        return data

class DataTable(ViewPaginatorMixin, View):
  def get(self, request):
    page = request.GET.get('page', '')
    limit = request.GET.get('limit', '10')
    if limit == "undefined":
      limit = '10'
    dataset = Sale.objects.values(
      'seller__name', 'seller__id', 'date').annotate(svisited=Sum('visited'),
                                 sdeals=Sum('deals'),
                                 samount=Sum('amount')).order_by('-date')
    serialized = [{
      "id": i+1,
      "seller": d['seller__name'],
      "date": d['date'],
      'svisited': d['svisited'],
      'sdeals': d['sdeals'],
      'samount': float(d['samount'])
    } for i, d in enumerate(dataset)]
    return JsonResponse(self.paginate(serialized, int(page), int(limit)))

