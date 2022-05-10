from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
from django.utils.translation import gettext_lazy as _

from apps.donate.models import Association, Activity

class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, user_name, first_name, last_name, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff = True.')

        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser = True.')

        return self.create_user(email, user_name, first_name, last_name, password, **other_fields)

    def create_user(self,email, user_name, first_name, last_name, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))
        
        email = self.normalize_email(email)
        user = self.model(email=email, user_name=user_name,
                        first_name=first_name, last_name=last_name, **other_fields)

        user.set_password(password)
        user.save()
        return user

# Custom User 
class Profile(AbstractBaseUser, PermissionsMixin):
    picture = models.ImageField(upload_to='profiles/',null=True, blank=True)
    user_name = models.CharField(max_length=150, unique=True)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(max_length=150, blank=True)
    last_name = models.CharField(max_length=150, blank=True)
    start_date = models.DateTimeField(auto_now_add=True)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)

    is_in_association = models.BooleanField(default=False)
    is_in_activity = models.BooleanField(default=False)
    association = models.ForeignKey(Association, on_delete=models.SET_NULL, null=True, blank=True)
    activity = models.ForeignKey(Activity, on_delete=models.SET_NULL, null=True, blank=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['user_name','first_name', 'last_name']

    def __str__(self):
        return self.user_name