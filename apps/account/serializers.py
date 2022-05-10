from rest_framework import serializers
from .models import Profile




class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ('user_name','first_name','last_name','email','password')
        extra_kwargs = {'password':{'write_only':True}}


    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)
        
        # if password is not None:
        instance.set_password(password)

        return instance


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = (
                'user_name',
                'first_name',
                'last_name',
                'picture',
                'email',
                'is_in_activity',
                'is_in_association',
                'activity',
                'association',
                'is_staff',
                'picture'
        )