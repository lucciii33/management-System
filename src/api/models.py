from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import DateTime
from datetime import datetime
import enum

db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=False)

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(200), unique=False, nullable=False)
    answer_type = db.Column(db.String(50), unique=False, nullable=False )
    made_by = db.Column(db.String(50), unique=False, nullable=True )
    # stat_type = db.Column(db.Enum(StatusType),values_callable=lambda x: [str(stat.value) for stat in StatusType])
    

    def __repr__(self):
        return f'<Project {self.task}>'

    def serialize(self):
        return {
            "task": self.task,
            "answer_type": self.answer_type,
            "id": self.id,
            "made_by": self.made_by,
            # do not serialize the password, its a security breach
        }


class Calendar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(200), unique=False, nullable=False)
    start_time = db.Column(db.DateTime(timezone=True) )
    end_time = db.Column(db.DateTime(timezone=True))
    # stat_type = db.Column(db.Enum(StatusType),values_callable=lambda x: [str(stat.value) for stat in StatusType])
    

    def __repr__(self):
        return f'<Calendar {self.description}>'

    def serialize(self):
        return {
            "description": self.description,
            "id": self.id,
            "start_time": self.start_time,
            "end_time": self.end_time,
            # do not serialize the password, its a security breach
        }

class Staff(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(200), unique=False, nullable=False)
    

    def __repr__(self):
        return f'<Staff {self.full_name}>'

    def serialize(self):
        return {
            "full_name": self.full_name,
            "id": self.id,
            # do not serialize the password, its a security breach
        }

class InAndOut(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    person_id = db.Column(db.Integer, db.ForeignKey('staff.id'), nullable=False)
    name = db.Column(db.String(200), unique=False, nullable=True)
    staff = db.relationship("Staff",  backref="inandout", uselist=False)
    start_time = db.Column(db.DateTime(timezone=True) )
    end_time = db.Column(db.DateTime(timezone=True))
    clock_in = db.Column(db.Boolean(), unique=False, nullable=False)
    # stat_type = db.Column(db.Enum(StatusType),values_callable=lambda x: [str(stat.value) for stat in StatusType])
    

    def __repr__(self):
        return f'<InAndOut {self.id}>'

    def serialize(self):
        return {
            "person_id": self.person_id,
            "id": self.id,
            "start_time": self.start_time,
            "clock_in": self.clock_in,
            "name": self.name,
            "end_time": self.end_time,
            # do not serialize the password, its a security breach
        }

class Restaurant_table(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    dish_name = db.Column(db.String(200), unique=False, nullable=True)
    price = db.Column(db.Integer, unique=False, nullable=True)
    start_ticket_time = db.Column(db.DateTime(timezone=True) )
    end_ticket_time = db.Column(db.DateTime(timezone=True))
    table_time = db.Column(db.DateTime(timezone=True))
    table_number =  db.Column(db.Integer, unique=False, nullable=True)
    important_changes = db.Column(db.String(200), unique=False, nullable=True)

    # stat_type = db.Column(db.Enum(StatusType),values_callable=lambda x: [str(stat.value) for stat in StatusType])

    def __repr__(self):
        return f'<Restaurant_table {self.dish_name}>'

    def serialize(self):
        return {
            "dish_name": self.dish_name,
            "price": self.price,
            "start_ticket_time": self.start_ticket_time,
            "end_ticket_time": self.end_ticket_time,
            "table_time": self.table_time,
            "table_number":self.table_number,
            "important_changes": self.important_changes
            # do not serialize the password, its a security breach
        }