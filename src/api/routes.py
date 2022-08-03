"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Project
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/task', methods=['GET'])
def get_tasks():

    todo_query = Project.query.all()
    all_todos = list(map(lambda x: x.serialize(), todo_query))
    response_body = {
        "msg": "Hello, this is your GET /tasks response "
    }

    return jsonify(all_todos), 200

@api.route('/task', methods=['POST'])
def post_tasks():
    body = request.get_json()

    task = Project(task= body['task'], answer_type="todo")
    db.session.add(task)
    db.session.commit()
    task_query = Project.query.all()
    all_tasks = list(map(lambda x: x.serialize(), task_query))

    return jsonify(all_tasks), 200

@api.route('/task/<int:id>', methods=['PUT'])
def edit_tasks(id):
    body = request.get_json()

    task = Project.query.filter_by(id=id).one_or_none()
    if task is None:
        raise APIException('task not found', status_code=404)

    if "answer_type" in body:
        task.answer_type = body["answer_type"]
        db.session.commit()

    task_query = Project.query.all()
    all_tasks = list(map(lambda x: x.serialize(),  task_query))

    return jsonify(all_tasks), 200

@api.route('/task/<int:id>', methods=['DELETE'])
def delete_tasks(id):
    task_id = Project.query.filter_by(id).one_or_none(id=id)
    if task_id is None:
        raise APIException('task not found', status_code=404)
   
    db.session.delete(task_id)
    db.session.commit()

    
    task_query = Project.query.all()
    all_tasks = list(map(lambda x: x.serialize(), todo_query))

    return jsonify(all_tasks), 200
