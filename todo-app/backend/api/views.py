from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view

from api.models import Todo
from api.serialize import TodoSerializer

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        {
            'Endpoint': '/todos/',
            'method': 'GET',
            'body': None,
            'description': 'This route will return all the todos'
        },
        {
            'Endpoint': '/todos/id',
            'method': 'GET',
            'body': None,
            'description': 'This route will return single todo of specifies ID'
        },
        {
            'Endpoint': '/todos/create/',
            'method': 'POST',
            'body': {'body': ''},
            'description': 'This route will create a todo'
        },
        {
            'Endpoint': '/todos/id/update',
            'method': 'PUT',
            'body': {'body': ''},
            'description': 'This route will update the selected todo todos'
        },
        {
            'Endpoint': '/todos/id/delete',
            'method': 'DELETE',
            'body': None,
            'description': 'This route will delete the todo'
        },
    ]
    return Response(routes)

@api_view(['GET'])
def getTodos(request):
    todos = Todo.objects.all()
    serialized = TodoSerializer(todos, many=True)
    return Response(serialized.data)

@api_view(['GET'])
def getTodo(request, pk):
    todo = Todo.objects.get(id=pk)
    serialized = TodoSerializer(todo, many=False)
    return Response(serialized.data)

@api_view(['PUT'])
def updateTodo(request, pk):
    data = request.data
    todo = Todo.objects.get(id=pk)
    serialized = TodoSerializer(instance=todo, data=data)
    if serialized.is_valid():
        serialized.save()
    return Response(serialized.data)

@api_view(['DELETE'])
def deleteTodo(request, pk):
    todo = Todo.objects.get(id=pk)
    todo.delete()
    return Response('Todo deleted Successfully')

@api_view(['POST'])
def addTodo(request):
    print(request.data)
    data = request.data
    todo = Todo.objects.create(
        topic = data['topic'],
        body =  data['body'],
    )
    serialized = TodoSerializer(todo, many=False)
    return Response(serialized.data)