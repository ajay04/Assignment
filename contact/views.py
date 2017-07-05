from .models import Contacts
from django.contrib.auth.models import User
from django.views.generic import (ListView, DetailView,
                                  UpdateView, DeleteView, CreateView, View)
from django.core.urlresolvers import reverse_lazy
from django.http import HttpResponseRedirect
from django.contrib.auth import logout
from mysite import settings



class contact_list(ListView):

    '''
    Display the Contact list
    '''

    template_name = "contact/contact_list.html"
    context_object_name = "contact"

    def get_queryset(self):
        return Contacts.objects.filter(user=self.request.user)



class contact_edit(UpdateView):

    '''
    Display the Contact edit
    '''
    template_name = "contact/contact_edit.html"
    model =  Contacts
    fields = ['name' , 'mobile' , 'address']
    success_url = reverse_lazy("contact:contact_list")


class contact_delete(DeleteView):

    '''
    Contact delete
    '''

    model = Contacts
    success_url = reverse_lazy("contact:contact_list")


class contact_save(CreateView):

    '''
    Contact save
    '''

    model =  Contacts
    template_name = "contact/contact_save.html"
    fields = ['name' , 'mobile' , 'address']
    success_url = reverse_lazy("contact:contact_list")

    def form_valid(self, form):
        user = self.request.user
        form.instance.user = user
        return super(contact_save, self).form_valid(form)


class Logout(View):

    def get(self, request):
        logout(request)
        return HttpResponseRedirect(settings.LOGIN_URL)
