# Generated by Django 3.1.1 on 2020-09-15 06:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('accounts', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Music',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=50)),
                ('file_source', models.FileField(upload_to='')),
            ],
        ),
        migrations.CreateModel(
            name='Video',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('file_source', models.FileField(upload_to='')),
                ('kid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.kid')),
            ],
        ),
        migrations.CreateModel(
            name='Script',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('content', models.TextField()),
                ('kid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.kid')),
            ],
        ),
        migrations.CreateModel(
            name='Picture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('file_source', models.ImageField(upload_to='')),
                ('kid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.kid')),
            ],
        ),
        migrations.CreateModel(
            name='Paint',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('file_source', models.ImageField(upload_to='')),
                ('kid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.kid')),
            ],
        ),
        migrations.CreateModel(
            name='Character',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('eat_time', models.DateTimeField(default='2020-01-01 00:00:00')),
                ('wash_time', models.DateTimeField(default='2020-01-01 00:00:00')),
                ('kid', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='accounts.kid')),
            ],
        ),
    ]
