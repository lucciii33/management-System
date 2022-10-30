"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Project, Calendar, Staff, InAndOut, Item, Order, order_item, HoursTracker
from api.utils import generate_sitemap, APIException
from datetime import datetime
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

# @api.route("/login", methods=["POST"])
# def login():
#     email = request.json.get("email", None)
#     password = request.json.get("password", None)
#     if email != "test" or password != "test":
#         return jsonify({"msg": "Bad username or password"}), 401

#     access_token = create_access_token(identity=email)
#     return jsonify(access_token=access_token)


@api.route("/login", methods=["POST"])
def create_token_user():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    user = User.query.filter_by(email=email, password=password ).first()


    if user is None:
        # the user was not found on the database
        return jsonify({"msg": "Bad username or password"}), 401
    
    print(user.id)
    access_token = create_access_token(identity=user.id)
    
    return jsonify({'access_token':access_token, 'user': user.serialize()})


@api.route('/register', methods=['POST'])
def register_user():
    body = request.json

    user = User(email=body['email'], password=body['password'] )
    db.session.add(user)
    db.session.commit()

    return jsonify({"message" : "your user has been registered"}), 200



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
    calendary = Calendar(description= body['description'], start_time= body['start_time'], quantity= body['quantity'], name=body['name'], hour=body['hour'])
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
@jwt_required()
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
@jwt_required()
def get_staff_info():
    staff_info_query = Staff.query.all()
    all_staff_info = list(map(lambda x: x.serialize(), staff_info_query))
    response_body = {
        "msg": "Hello, here is your staff "
    }

    return jsonify(all_staff_info), 200


##################################### hours system ################################

@api.route('/hours_system', methods=['POST'])
@jwt_required()
def post_staff_hours():
    body = request.get_json()
    #explication about body
    system = InAndOut(person_id = body['person_id'], clock_in=body["clock_in"], start_time= body['start_time'],end_time=body["end_time"], name=body["name"])
    db.session.add(system)
    db.session.commit()
    staff_query = InAndOut.query.all()
    all_staff = list(map(lambda x: x.serialize(), staff_query))


    return jsonify(all_staff), 200

#reporte hours system 
@api.route('/hours_system/reporter', methods=['POST'])
# @jwt_required()
def reporter_staff_hours():
    body = request.get_json()
    
    #explication about body
    monthly_staff_hours = []
    staff_query = InAndOut.query.all()
    for x in staff_query:
        person_hours = InAndOut.query.filter_by(person_id = x.id)
        person_hours = person_hours.filter(lambda x:x, x.start_time.__contains__(body.year_month) == TRUE, person_hours)
        monthly_staff_hours.append(person_hours)
    print(monthly_staff_hours)
        
    # all_staff = list(map(lambda x: x.serialize(), staff_query))


    return jsonify("working"), 200

@api.route('/hours_system', methods=['GET'])
@jwt_required()
def get_staff_hours():
    staff_info_query = InAndOut.query.all()
    all_staff_info = list(map(lambda x: x.serialize(), staff_info_query))
    response_body = {
        "msg": "Hello, here is your staff "
    }

    return jsonify(all_staff_info), 200

@api.route('/hours_system/<int:id>', methods=['PUT'])
@jwt_required()
def edit_staff_hours(id):
    body = request.get_json()

    staff_id = InAndOut.query.get(id)
    if staff_id is None:
        raise APIException('User not found', status_code=404)

    if "clock_in" in body:
        staff_id.clock_in = body["clock_in"]
    if "start_time" in body:
        staff_id.start_time = body["start_time"]
    if "end_time" in body:
        staff_id.end_time = body["end_time"]
        # hours = HoursTracker(time_stamp = staff_id.id, start_time = staff_id.start_time, end_time = staff_id.end_time)
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




#####here is the order creation

@api.route('/order_system', methods=['POST'])
def post_orders():
    body = request.get_json()
    data = body["data"]
    price = 0
    items = data["items"]

    for item in items:

        price += item["price"]   
    order = Order(status="pending", total_price=price, start_ticket_time=datetime.now(), important_changes=data["important_changes"], table_number=data['table_number'],)

    for item in items:

        query = Item.query.filter_by(id = item["id"]).first()
        query.orders.append(order)

    db.session.add(order)
    db.session.commit()

    return "success",200


@api.route('/get_orders', methods=['GET'])
def get_orders():
    order_info_query = Order.query.all()
    order_info = list(map(lambda x: x.serialize(), order_info_query))
    response_body = {
        "msg": "Hello, here is your staff "
    }

    return jsonify(order_info), 200



@api.route('/order_system/<int:id>', methods=['PUT'])
def edit_orders(id):
    body = request.get_json()

    order = Order.query.filter_by(id=id).one_or_none()
    if order is None:
        raise APIException('task not found', status_code=404)

    if "status" in body:
        order.status = body["status"]
        db.session.commit()
        print(body)

    order_query = Order.query.all()
    all_orders = list(map(lambda x: x.serialize(),  order_query))

    return jsonify(all_orders), 200