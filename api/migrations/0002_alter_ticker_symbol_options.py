# Generated by Django 4.0.4 on 2022-04-12 11:59

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='ticker_symbol',
            options={'ordering': ('instrument', 'datetime')},
        ),
    ]
