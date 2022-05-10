from django.urls import path

from .views import RegisterView, BlacklistTokenView, update_profile


app_name = 'api-account'

urlpatterns = [
                                    # Auth
    path('register/', RegisterView.as_view(), name='register-user'),
    path('logout/', BlacklistTokenView.as_view(), name='logout-user'),
    path('update-user/', update_profile, name='update-user'),
]
