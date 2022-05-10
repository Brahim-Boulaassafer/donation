from django.contrib import admin

# Register your models here.
from .models import Profile

@admin.register(Profile)
class AdminProfile(admin.ModelAdmin):
    list_display = ('user_name','first_name','last_name','email','is_in_association','is_active','is_staff')
    search_fields = ('user_name',)