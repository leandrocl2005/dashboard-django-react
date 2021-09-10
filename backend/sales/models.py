from django.db import models


# Create your models here.
class Seller(models.Model):

  name = models.CharField(max_length=255)

  def __str__(self):
    return self.name


class Sale(models.Model):

  visited = models.IntegerField()
  deals = models.IntegerField()
  amount = models.DecimalField(decimal_places=2, max_digits=12)
  date = models.DateField()
  seller = models.ForeignKey(Seller, on_delete=models.CASCADE)

  @property
  def seller_name(self):
    return self.seller.name

  def __str__(self):
    return self.seller_name + ", " + str(self.amount) + " (" + str(
        self.date) + ")"
