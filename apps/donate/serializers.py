from rest_framework import serializers
from django.contrib.auth.models import User

from .models import (Association, Sponsore,
                    Activity, Category,
                    Gallery, Donation)

from apps.account.models import Profile


class SponsoreSerializer(serializers.ModelSerializer):
    class Meta:
        model = Sponsore
        fields = ('name', 'logo', 'sponsor_url')

class AssociationSerializer(serializers.ModelSerializer):
    sponsores = SponsoreSerializer(many=True)
    class Meta:
        model= Association
        fields = (
            "name",
            "association_code",
            "slug",
            "fax",
            "phone_number",
            "about",
            "sponsores",
            "email",
            "url",
            "facebook",
            "instagram",
            "twitter",
            "logo",
            'background_image',
            "association_created_date",
            "get_absolute_url",
        )
        

class ActivitySerializer(serializers.ModelSerializer):
    association = AssociationSerializer()
    class Meta:
        model = Activity
        fields = (
            "name",
            "slug",
            "about",
            "association",
            "is_need_volunteers",
            "volunteers_number_needed",
            "volunteers_number_have",
            "start_on", 
            "created",      
            "is_finished",
        )

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = (
            'name',
            'slug',
        )

class GallerySerializer(serializers.ModelSerializer):
    # activity = ActivitySerializer()
    class Meta:
        model = Gallery
        fields = ('id', 'image',)



class DonationSerializer(serializers.ModelSerializer):

    class Meta:
        model = Donation
        fields = (
            'profile',
            'association',
            'amount',
        )


