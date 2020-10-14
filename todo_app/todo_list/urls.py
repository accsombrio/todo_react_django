from rest_framework import routers
from .api import TodoViewSet

router = routers.DefaultRouter()
router.register('api/todo_list', TodoViewSet, 'todo_list')

urlpatterns = router.urls