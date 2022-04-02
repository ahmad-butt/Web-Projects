from . import views
from django.urls import path


urlpatterns = [
    path('', views.getRoutes),
    path('todos/', views.getTodos),
    path('todos/<str:pk>/update/', views.updateTodo),
    path('todos/<str:pk>/delete/', views.deleteTodo),
    path('todos/add/', views.addTodo),
    path('todos/<str:pk>/', views.getTodo),
]