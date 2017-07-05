from django.conf.urls import url, include
from . import views
from django.contrib import admin
from .views import contact_list, contact_edit, contact_save, contact_delete, Logout
from django.contrib.auth.decorators import login_required

app_name = 'contact'

urlpatterns = [
    url(r'^$', login_required(contact_list.as_view()), name='contact_list'),
    url(r'^new/$', login_required(contact_save.as_view()), name='contact_save'),
    url(r'^(?P<pk>\d+)/edit/$', (contact_edit.as_view()), name='contact_edit'),
    url(r'^logout$', Logout.as_view(), name='logout'),
    url(r'^(?P<pk>\d+)/delete/$',
        login_required(contact_delete.as_view()), name='contact_delete')
]
