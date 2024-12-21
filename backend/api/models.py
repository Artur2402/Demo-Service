from django.db import models


class Company(models.Model):
  inn = models.CharField(max_length=12, unique=True, verbose_name='ИНН')
  ogrn = models.CharField(max_length=13, unique=True, verbose_name='ОГРН')
  name = models.CharField(max_length=255, verbose_name='Название компании')
  address = models.TextField(verbose_name='Адрес')
  director = models.CharField(max_length=255, verbose_name='Руководитель', blank=True, null=True)
  activity = models.TextField(verbose_name='Вид деятельности', blank=True, null=True)
  registration_date = models.DateField(verbose_name='Дата регистрации', blank=True, null=True)
  status = models.CharField(max_length=50, verbose_name='Статус', default='Активна')

  def __str__(self):
    return self.name
  
  class Meta:
    verbose_name = 'Компания'
    verbose_name_plural = 'Компании'