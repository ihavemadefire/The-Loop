# Generated by Django 3.2.6 on 2021-09-09 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0012_auto_20210909_1532'),
    ]

    operations = [
        migrations.AlterField(
            model_name='place',
            name='subtype',
            field=models.ManyToManyField(to='api.SubType'),
        ),
    ]