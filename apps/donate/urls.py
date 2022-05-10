from django.urls import path


from . import views

app_name='api'

urlpatterns = [

                            # Association
    path('associations/',views.AssociationList.as_view(), name='associations'), # Get - Post
    path('associations/<slug:slug>/',views.AssociationDetail.as_view(), name='association'), # Get - Update - delete
    # path('associations/create/',views.create_association, name='create-association'),
    # path('associations/<slug:slug>/',views.update_or_delete_association, name='update-delete-association'),

                                # Activity
    path('activities/',views.ActivityList.as_view(), name='activities'),
    # path('activities/<slug:slug>/',views.get_activity, name='activity'),
    # path('activities/create/',views.create_activity, name='create-activity'),
    # path('activities/<slug:slug>/',views.update_or_delete_activity, name='update-activity'),

    #                             # Gallery
    # path('galleries/',views.home_galleries, name='galleries'),

    #                             # Act
    # # path('associations/<slug:slug>/donations/', views.donation_detail, name='detail-donation'),
    # path('activities/<slug:slug>/volunteer/', views.add_volunteer, name='add-volunteer'),

    #                             # Stripe
    # path('<slug:slug>/charge/', views.charge, name='donate'),

]
