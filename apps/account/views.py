from rest_framework.views import APIView
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated

from .serializers import RegisterSerializer, ProfileSerializer


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():            
            newuser = serializer.create(serializer.validated_data)
            newuser.save()
            if newuser:
                return Response(status=status.HTTP_201_CREATED)
                
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BlacklistTokenView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            refresh_token = request.data['refresh_token']
            token = RefreshToken(refresh_token)
            token.blacklist()
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)


        return Response(status=status.HTTP_200_OK)

@api_view(['GET','PUT'])
@permission_classes([IsAuthenticated])
def update_profile(request):
    user = request.user
    serializer = ProfileSerializer(user)

    if request.method == 'PUT':
        serializer = ProfileSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


    return Response({'user':serializer.data}, status=status.HTTP_200_OK)

