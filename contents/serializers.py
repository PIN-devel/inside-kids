from rest_framework import serializers
from .models import Video, Paint, Picture, Music, Script, Character

# video


class VideoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Video
        fields = ('id', 'file_source',)


# paint


class PaintSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paint
        fields = ('id', 'file_source',)


class PaintListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Paint
        fields = ('id', 'created_at', 'file_source')

# picture


class PictureSerializer(serializers.ModelSerializer):

    class Meta:
        model = Picture
        fields = ('id', 'file_source',)


class PictureListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Picture
        fields = ('id', 'created_at', 'file_source')

# music


class MusicListSerializer(serializers.ModelSerializer):

    class Meta:
        model = Music
        fields = ('id', 'title', 'file_source')

# script


class ScriptSerializer(serializers.ModelSerializer):

    class Meta:
        model = Script
        fields = ('id', 'created_at', 'file_source')

# character


class CharacterSerializer(serializers.ModelSerializer):

    class Meta:
        model = Character
        fields = ('id', 'eat_time', 'wash_time')
