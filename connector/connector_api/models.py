from django.db import models
import uuid
from connector.base_models import TimeStampMixin

class Connector(TimeStampMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    name = models.CharField(max_length=120, unique=True)
    status = models.CharField(max_length=10, default="active")
    connector_type = models.CharField(max_length=60, null=True, blank=True)
    
    def __str__(self):
        return self.name