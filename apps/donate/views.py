# py imports
import json

# Django imports
from django.conf import settings
from django.http.response import JsonResponse
from django.shortcuts import get_object_or_404
# project imports
from .serializers import (AssociationSerializer, ActivitySerializer,
                        DonationSerializer,GallerySerializer)

from .models import (Association, Activity, Donation, Gallery)
from apps.account.serializers import ProfileSerializer

# third party imports
import stripe

#- DRF imports
from rest_framework.views import APIView
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions, generics, mixins




# custom permission 
class IsReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return False


# ------------------------------------ Associations -------------------------------------

# @api_view(['GET'])
# @permission_classes([AllowAny])
class AssociationList(APIView):
    permission_classes = [IsReadOnly|permissions.IsAdminUser&permissions.IsAuthenticated]

    def get(self, request, format=None):
        associations = Association.objects.all()
        serializer = AssociationSerializer(associations, many=True)
        return Response({'associations':serializer.data})
    
    def post(self, request, format=None):
        serializer = AssociationSerialier(data=request.data) 
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AssociationDetail(APIView):
    permission_classes = [IsReadOnly|permissions.IsAdminUser&permissions.IsAuthenticated]

    def get_object(self, slug):
        return get_object_or_404(Association, slug=slug)
        #     return Association.objects.get(slug=slug)
        # except Association.DoesNotExist:
        #     raise Http404

    def get(self, request, slug, format=None):
        association= self.get_object(slug)
        activities = association.activity_set.all()
        users = association.profile_set.filter(is_staff=True)
        users_serializer = ProfileSerializer(users, many=True, read_only=True)
        activities_serializer = ActivitySerializer(activities, many=True, read_only=True)
        association_serializer = AssociationSerializer(association, read_only=True)
        return Response({'association':association_serializer.data, 'activities':activities_serializer.data, 'users':users_serializer.data})

    def put(self,request, slug, format=None):
        association= self.get_object(sulg)
        serializer = AssociationSerializer(association)
        serializer = AssociationSerializer(association, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, slug, format=None):
        association= self.get_object(sulg)
        association.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_association(request, slug):
#     try:
#         association = Association.objects.get(slug=slug)
#     except Association.DoesNotExist:
#         return Response({'error':'Association Not Found.'}, status=status.HTTP_404_NOT_FOUND)

#     activities = association.activity_set.all()
#     users = association.profile_set.filter(is_staff=True)
#     users_serializer = ProfileSerializer(users, many=True, read_only=True)
#     activities_serializer = ActivitySerializer(activities, many=True, read_only=True)
#     association_serializer = AssociationSerializer(association, read_only=True)
#     return Response({'association':association_serializer.data, 'activities':activities_serializer.data, 'users':users_serializer.data})

# @api_view(['POST'])
# @permission_classes([IsAdminUser, IsAuthenticated])
# def create_association(request):
#     if request.method == 'POST':
#         serializer = AssociationSerialirandom_numzer(data=request.data) 
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT', 'DELETE'])
# @permission_classes([IsAdminUser, IsAuthenticated])
# def update_or_delete_association(request, slug):
#     try:
#         association = Association.objects.get(slug=slug)
#     except Association.DoesNotExist:
#         return Response({'error':'Association Not Found.'}, status=status.HTTP_404_NOT_FOUND)

#     serializer = AssociationSerializer(association)
#     if request.method == 'PUT':
#         serializer = AssociationSerializer(association, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         association.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

# ------------------------------------ End Associations -------------------------------------


# ------------------------------------- Activities -------------------------------------------

class ActivityList(mixins.ListModelMixin, mixins.CreateModelMixin, generics.GenericAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsReadOnly|permissions.IsAdminUser&permissions.IsAuthenticated]

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class ActivityDetail(mixins.RetrieveModelMixin,
                    mixins.UpdateModelMixin,
                    mixins.DestroyModelMixin,
                    generics.GenericAPIView):
    queryset = Activity.objects.all()
    serializer_class = ActivitySerializer
    permission_classes = [IsReadOnly|permissions.IsAdminUser&permissions.IsAuthenticated]



    def get(self, request, *args, **kwargs):
        return self.retrieve(request, *args, **kwargs)

    def put(self, request, *args, **kwargs):
        return self.update(request, *args, **kwargs)

    def delete(self, request, *args, **kwargs):
        return self.destroy(request, *args, **kwargs)


# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_activities(request):
#     activities = Activity.objects.all()
#     serializer = ActivitySerializer(activities, many=True)
#     return Response({'activities':serializer.data})

# @api_view(['GET'])
# @permission_classes([AllowAny])
# def get_activity(request, slug):
#     try:
#         activity = Activity.objects.get(slug=slug)
#     except Activity.DoesNotExist:
#         return Response({'error':'Activity Not Found'},status=status.HTTP_404_NOT_FOUND)

#     serializer = ActivitySerializer(activity)
#     return Response({'activity':serializer.data}, status=status.HTTP_200_OK)


# @api_view(['POST'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def create_activity(request):
#     if request.method == 'POST':
#         serializer = ActivitySerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# @api_view(['PUT', 'DELETE'])
# @permission_classes([IsAuthenticated, IsAdminUser])
# def update_or_delete_activity(request, slug):
#     try:
#         activity = Activity.objects.get(slug=slug)
#     except Activity.DoesNotExist:
#         return Response({'error':'Activity Not Found'},status=status.HTTP_404_NOT_FOUND)

#     serializer = ActivitySerializer(activity)
#     if request.method == 'PUT':
#         serializer = ActivitySerializer(activity, data=request.data, partial=True)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_200_OK)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#     elif request.method == 'DELETE':
#         activity.delete()
#         return Response(status=status.HTTP_204_NO_CONTENT)

    
# # ------------------------------------- End Activities -------------------------------------------


# # ------------------------------------- Gallery -------------------------------------------------
# @api_view(['GET', ])
# @permission_classes([AllowAny])
# def home_galleries(request):
#     galleries = Gallery.objects.all()[:5]
#     serializer = GallerySerializer(galleries, many=True)

#     return Response({'galleries':serializer.data})



# # stripe conf
# stripe.api_key = settings.STRIPE_SECRET_KEY

# # ------------------------------------------ Donation --------------------------------
# @api_view(['GET','POST'])
# @permission_classes([AllowAny])
# def charge(request, slug):

#     data = request.data
#     print('-->',data)
#     try:
#         association = Association.objects.get(slug=slug)
#     except Association.DoesNotExist:
#         return Response({'error':'Association Not Found.'}, status=status.HTTP_404_NOT_FOUND)
#     # Create a Customer
#     amount=int(data["amount"])*100
#     user=None
#     if request.user.is_authenticated:
#         user=request.user


#     stripe.Charge.create(
#         amount=amount,
#         currency="usd",
#         # customer=customer,
#         source=data["stripeToken"],
#         description="Donation",
#     )
    
#     Donation.objects.create(
#         profile=user,
#         association=association,
#         amount=amount/100,
#     )


#     return Response({'message':'Donation Success'},status=status.HTTP_201_CREATED)


# # ------------------------------------------ End Donation --------------------------------

# # ---------------------------------------- Volunteers --------------------------------

# @api_view(['PATCH'])
# @permission_classes([IsAuthenticated])
# def add_volunteer(request, slug):

#     if request.user.is_in_activity:
#         return Response({'detail':'you already in an Activity'})

#     try:
#         activity = Activity.objects.get(slug=slug)
#     except Activity.DoesNotExist:
#         return Response({'error':'Activity Not Found'},status=status.HTTP_404_NOT_FOUND)

#     data = {'is_in_activity':True, 'activity':activity.id}
#     user_serializer = ProfileSerializer(request.user, data=data, partial=True)
    
#     if user_serializer.is_valid():
#         activity.update_volunteers_number()
#         activity.save()
#         activity_serializer = ActivitySerializer(activity)
#         user_serializer.save()
#         return Response({'detail':'Thanks for beeing Volunteer!!'},status=status.HTTP_200_OK)
#     return Response({'error':'You are UnAuthenticated'},status=status.HTTP_400_BAD_REQUEST)