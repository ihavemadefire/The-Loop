# Generated by Django 3.2.6 on 2021-09-14 15:01

from django.db import migrations, models
from datetime import datetime

class Migration(migrations.Migration):

    dependencies = [
        ('api', '0015_auto_20210913_2017'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='when',
            field=models.DateTimeField(default=datetime.now),
        ),
    ]
