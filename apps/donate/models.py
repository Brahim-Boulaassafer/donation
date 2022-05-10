import os

from django.db import models
from django.urls import reverse
from django.shortcuts import redirect
from django.conf import settings

class Association(models.Model):
    def get_upload_url(instance, filename):
        return os.path.join("association",f"{instance.slug}", filename)

    name = models.CharField(max_length=150, unique=True)
    association_code = models.CharField(max_length=150, unique=True)
    slug = models.SlugField(max_length=150, unique=True)
    logo = models.ImageField(upload_to=get_upload_url)
    background_image = models.ImageField(upload_to=get_upload_url, null=True)
    about = models.TextField(blank=True, null=True)
    category = models.ForeignKey('Category', null=True, on_delete=models.SET_NULL)
    fax = models.CharField(max_length=15)
    phone_number = models.CharField(max_length=15, null=True)
    association_created_date = models.DateTimeField()
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True, name='modified')
    sponsores = models.ManyToManyField('Sponsore',related_name='sponsores')
    donation_amount = models.DecimalField(max_digits=1000 ,decimal_places=2, null=True)
    email = models.EmailField(max_length=150)
    url = models.URLField(max_length=100, null=True, blank=True)
    facebook = models.URLField(max_length=100, null=True, blank=True)
    instagram = models.URLField(max_length=100, null=True, blank=True)
    twitter = models.URLField(max_length=100, null=True, blank=True)


    class Meta:
        ordering=('-created',)

    def __str__(self):
        return self.name

    

    def get_absolute_url(self):
        return reverse('api:association', args=[self.slug])


class Category(models.Model):
    name = models.CharField(max_length=250)
    slug = models.SlugField(max_length=250, unique=True)

    class Meta:
        verbose_name_plural = 'Categories'


    def __str__(self):
        return self.name


class Activity(models.Model):
    name = models.CharField(max_length=150)
    slug = models.SlugField(max_length=150, unique=True)
    about = models.TextField()
    association = models.ForeignKey(Association, on_delete=models.CASCADE)
    is_need_volunteers = models.BooleanField(default=False, null=True)
    volunteers_number_needed = models.IntegerField(default=0)
    volunteers_number_have = models.IntegerField(default=0)
    start_on = models.DateTimeField()
    is_finished = models.BooleanField(default=False, blank=True)
    created = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name_plural = 'Activities'
        ordering = ('-created',)


    def __str__(self):
        return self.name

    def update_volunteers_number(self):
        if self.volunteers_number_needed == 0:
            self.volunteers_number_needed = 0
            return
        self.volunteers_number_have += 1
        self.volunteers_number_needed -= self.volunteers_number_have
    
    

class Sponsore(models.Model):
    def get_upload_url(instance, filename):
        return os.path.join("sponsores",f"{instance}", filename)

    name = models.CharField(max_length=200)
    logo = models.ImageField(upload_to=get_upload_url)
    sponsor_url = models.URLField(max_length=150, null=True)

    # def get_logo(self):
    #     return f'{self.logo.url}/'

    def __str__(self):
        return self.name
    

class Gallery(models.Model):
    def get_upload_url(instance, filename):
        return os.path.join("association","activities",f"{instance.slug}", filename)

    activity = models.ForeignKey(Activity, on_delete=models.CASCADE)
    image = models.ImageField(upload_to=get_upload_url)

    class Meta:
        verbose_name_plural = 'Galleries'
        ordering = ('-image',)

    def __str__(self):
        return self.activity.name
    
class Donation(models.Model):
    profile = models.ForeignKey(settings.AUTH_USER_MODEL,null=True, on_delete=models.SET_NULL)
    association = models.ForeignKey(Association,null=True, on_delete=models.SET_NULL)
    amount = models.DecimalField(max_digits=10 ,decimal_places=2, null=True)
    donated_on = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f'{self.amount}'
    