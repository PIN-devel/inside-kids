# Generated by Django 3.1.1 on 2020-09-30 11:14

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0001_initial'),
        ('contents', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='script',
            name='used',
        ),
        migrations.AddField(
            model_name='script',
            name='file_source',
            field=models.FileField(blank=True, null=True, upload_to=''),
        ),
        migrations.AddField(
            model_name='script',
            name='state',
            field=models.IntegerField(null=True),
        ),
        migrations.AlterField(
            model_name='script',
            name='kid',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='accounts.kid'),
        ),
    ]