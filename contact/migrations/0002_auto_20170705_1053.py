# -*- coding: utf-8 -*-
# Generated by Django 1.11.3 on 2017-07-05 05:23
from __future__ import unicode_literals

from django.db import migrations
import phonenumber_field.modelfields


class Migration(migrations.Migration):

    dependencies = [
        ('contact', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contacts',
            name='mobile',
            field=phonenumber_field.modelfields.PhoneNumberField(max_length=128),
        ),
    ]
