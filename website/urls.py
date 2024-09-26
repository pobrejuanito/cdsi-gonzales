from django.conf.urls import include, url
from django.views.generic import TemplateView
from . import views

urlpatterns = [
   url(r'^$', views.index, name='home'),
    url(r'^captcha/', include('captcha.urls')),
    url(r'^privacy-policy.html', TemplateView.as_view(template_name="privacy-policy.html")),
    url(r'^sendmessage/', views.sendmessage, name='sendmessage'),
    url(r'^member-booking-form/', views.bookingform, name='bookingform'),11
]
