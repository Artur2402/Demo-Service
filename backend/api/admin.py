from django.contrib import admin
from .models import Company

@admin.register(Company)
class CompanyAdmin(admin.ModelAdmin):
    # Поля, отображаемые в списке
    list_display = ('inn', 'ogrn', 'name', 'address', 'director', 'registration_date', 'status')
    
    # Поля для поиска
    search_fields = ('name', 'inn', 'ogrn', 'address', 'director')
    
    # Поля для фильтрации
    list_filter = ('status', 'registration_date', 'activity')
    
    # Поля, доступные в форме
    fields = ('inn', 'ogrn', 'name', 'address', 'director', 'activity', 'registration_date', 'status')
    
    # Поля только для чтения
    readonly_fields = ()
