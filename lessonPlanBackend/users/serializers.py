from rest_framework import serializers

from .models import User
from django.core import validators
from django.core import exceptions
import django.contrib.auth.password_validation as validators


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'first_name', 'last_name', 'password', 'secret')
        extra_kwargs = {'password': {'write_only': True, 'required': True}, 'secret': {'write_only': True}}

    def validate_password(self, value):
        try:
            validators.validate_password(value)
        except exceptions.ValidationError as exc:
            raise serializers.ValidationError(str(exc))
        return value

    def create(self, validated_data):
        user = super().create(validated_data)
        user.set_password(validated_data['password'])

        user.is_active = False
        user.save()
        return user




