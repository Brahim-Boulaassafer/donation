from django.contrib import admin


from .models import Association, Category, Activity, Sponsore, Gallery, Donation


@admin.register(Association)
class AdminAssociation(admin.ModelAdmin):
    list_display = ('name','association_code','category','fax','url','email','created')
    list_filter = ('category', 'sponsores')
    search_fields = ('name', 'association_code', 'email', 'url')
    date_hierarchy = 'modified'
    prepopulated_fields = {'slug':('name',)}

@admin.register(Category)
class AdminCategory(admin.ModelAdmin):
    prepopulated_fields = {'slug':('name',)}

@admin.register(Activity)
class AdminActivity(admin.ModelAdmin):
    list_display = ('name','association')
    prepopulated_fields = {'slug':('name',)}

@admin.register(Sponsore)
class AdminSponsore(admin.ModelAdmin):
    pass


@admin.register(Gallery)
class AdminGallery(admin.ModelAdmin):
    pass


@admin.register(Donation)
class AdminDonation(admin.ModelAdmin):
    pass