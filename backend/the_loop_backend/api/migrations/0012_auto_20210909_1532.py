# Generated by Django 3.2.6 on 2021-09-09 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0011_place_open_now'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='active',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='recurring',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='tix_required',
            field=models.BooleanField(null=True),
        ),
        migrations.AlterField(
            model_name='place',
            name='description',
            field=models.TextField(null=True),
        ),
        migrations.AlterField(
            model_name='place',
            name='subtype',
            field=models.ManyToManyField(null=True, to='api.SubType'),
        ),
    ]
