# Generated by Django 3.2.6 on 2021-08-22 00:58

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Amenities',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
            ],
        ),
        migrations.CreateModel(
            name='District',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('district', models.CharField(max_length=25)),
            ],
        ),
        migrations.CreateModel(
            name='SubType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('SubType', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Type',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('type', models.CharField(max_length=40)),
            ],
        ),
        migrations.CreateModel(
            name='Place',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
                ('address', models.CharField(max_length=100)),
                ('description', models.TextField()),
                ('phone_number', models.CharField(max_length=14)),
                ('price', models.CharField(choices=[('$', '$'), ('$$', '$$'), ('$$$', '$$$'), ('$$$$', '$$$$')], default=1, max_length=5)),
                ('amenities', models.ManyToManyField(to='api.Amenities')),
                ('district', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='api.district')),
                ('subtype', models.ManyToManyField(to='api.SubType')),
                ('type', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='api.type')),
            ],
        ),
    ]
