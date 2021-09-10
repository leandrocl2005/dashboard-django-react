from rest_framework import serializers

from .models import Seller, Sale


class SaleSerializer(serializers.ModelSerializer):

  class Meta:
    model = Sale
    fields = [
        "id", "seller", "visited", "deals", "amount", "date"
    ]
    depth=1


class SellerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Seller
    fields = ["id", "name"]
