from django.db import models
import uuid
from connector.base_models import TimeStampMixin

class ConnectorApp(TimeStampMixin):
    name = models.CharField(max_length=120, primary_key=True)
    display_name = models.CharField(max_length=120)
    port = models.CharField(max_length=10, null=True, blank=True)
    icon = models.CharField(max_length=120)
    
    def __str__(self):
        return self.display_name
    
class Connector(TimeStampMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    # name = models.CharField(max_length=120, unique=True)
    status = models.CharField(max_length=10, default="active")
    connector_type = models.CharField(max_length=60, null=True, blank=True)
    connector_app = models.OneToOneField(ConnectorApp, on_delete=models.CASCADE)
    paired_connector = models.CharField(max_length=60, null=True, blank=True)
    
    def __str__(self):
        return self.connector_app + " <-->" + self.paired_connector