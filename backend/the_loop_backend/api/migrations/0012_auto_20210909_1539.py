# Generated by Django 3.2.6 on 2021-09-09 15:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_place_open_now'),
    ]

    operations = [
        migrations.AddField(
            model_name='place',
            name='lat',
            field=models.FloatField(default=36.1565497),
        ),
        migrations.AddField(
            model_name='place',
            name='long',
            field=models.FloatField(default=-95.9950548),
        ),
    ]
