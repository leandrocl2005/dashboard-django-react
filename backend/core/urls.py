from django.contrib import admin
from django.urls import path

from sales import views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/sellers/', views.ListSellers.as_view()),
    path('api/sales/', views.DataTable.as_view()),
    path('api/data_donut/', views.data_donut),
    path('api/data_bar_chart/', views.data_bar_chart)
]
