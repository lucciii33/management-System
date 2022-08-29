"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Project, Calendar, Staff, InAndOut, Item
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
    #explication about body
    task = Project(task= body['task'], answer_type="todo", made_by=body["made_by"])
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
    task_id = Project.query.get(id)
    if task_id is None:
        raise APIException('task not found', status_code=404)
   
    db.session.delete(task_id)
    db.session.commit()

    
    task_query = Project.query.all()
    all_tasks = list(map(lambda x: x.serialize(), task_query))

    return jsonify(all_tasks), 200


##################################here start the roots for calendar###################################3

@api.route('/calendar', methods=['POST'])
def post_calendar():
    body = request.get_json()
    #explication about body
    calendary = Calendar(description= body['description'], start_time= body['start_time'], end_time= body['end_time'])
    db.session.add(calendary)
    db.session.commit()
    calendar_query = Calendar.query.all()
    all_calendar = list(map(lambda x: x.serialize(), calendar_query))

    return jsonify(all_calendar), 200

@api.route('/calendar', methods=['GET'])
def get_calendary_info():

    calendar_query = Calendar.query.all()
    all_calendaryInfo = list(map(lambda x: x.serialize(), calendar_query))
    response_body = {
        "msg": "Hello, this is your GET /tasks response "
    }

    return jsonify(all_calendaryInfo), 200


##################################Start here in-out system######################################################

@api.route('/staff_member', methods=['POST'])
def post_staff_member():
    body = request.get_json()
    #explication about body
    staff_name = Staff(full_name= body['full_name'])
    db.session.add(staff_name)
    db.session.commit()
    staff_query = Staff.query.all()
    all_staff = list(map(lambda x: x.serialize(), staff_query))

    return jsonify(all_staff), 200

@api.route('/staff_member', methods=['GET'])
def get_staff_info():
    staff_info_query = Staff.query.all()
    all_staff_info = list(map(lambda x: x.serialize(), staff_info_query))
    response_body = {
        "msg": "Hello, here is your staff "
    }

    return jsonify(all_staff_info), 200


##################################### hours system ################################

@api.route('/hours_system', methods=['POST'])
def post_staff_hours():
    body = request.get_json()
    #explication about body
    system = InAndOut(person_id = body['person_id'], clock_in=body["clock_in"], start_time= body['start_time'],end_time=body["end_time"], name=body["name"])
    db.session.add(system)
    db.session.commit()
    staff_query = InAndOut.query.all()
    all_staff = list(map(lambda x: x.serialize(), staff_query))


    return jsonify(all_staff), 200

@api.route('/hours_system', methods=['GET'])
def get_staff_hours():
    staff_info_query = InAndOut.query.all()
    all_staff_info = list(map(lambda x: x.serialize(), staff_info_query))
    response_body = {
        "msg": "Hello, here is your staff "
    }

    return jsonify(all_staff_info), 200

@api.route('/hours_system/<int:id>', methods=['PUT'])
def edit_staff_hours(id):
    body = request.get_json()

    staff_id = InAndOut.query.get(id)
    if staff_id is None:
        raise APIException('User not found', status_code=404)

    if "clock_in" in body:
        staff_id.clock_in = body["clock_in"]
    if "end_time" in body:
        staff_id.end_time = body["end_time"]
        db.session.commit()

    staff_query = InAndOut.query.all()
    all_staff = list(map(lambda x: x.serialize(), staff_query))

    return jsonify(all_staff), 200

###3 here start restaurant software 

@api.route('/rest_system', methods=['GET'])
def get_dishes():
    dish_info_query = Item.query.all()
    dishes_info = list(map(lambda x: x.serialize(), dish_info_query))
    response_body = {
        "msg": "Hello, here is your staff "
    }

    return jsonify(dishes_info), 200

@api.route('/rest_system', methods=['POST'])
def post_dishes():
    body = request.get_json()
    #explication about body
    dish = Item(name = body['name'], description=body["description"], price= body['price'])
    db.session.add(dish)
    db.session.commit()
    dish_query = Item.query.all()
    all_dishes = list(map(lambda x: x.serialize(), dish_query))


    return jsonify(all_dishes), 200