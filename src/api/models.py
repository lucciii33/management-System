from flask_sqlalchemy import SQLAlchemy
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

# class AnswerType(enum.Enum):
#     no = 'No'
#     yes = 'Yes'
#     dont_know = 'Do not Know'

#     def __str__(self):
#         return self.value


class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(200), unique=False, nullable=False)
    answer_type = db.Column(db.String(50), unique=False, nullable=False )
    madeBy = db.Column(db.String(50), unique=False, nullable=True )
    # stat_type = db.Column(db.Enum(StatusType),values_callable=lambda x: [str(stat.value) for stat in StatusType])
    

    def __repr__(self):
        return f'<Project {self.task}>'

    def serialize(self):
        return {
            "task": self.task,
            "answer_type": self.answer_type,
            "id": self.id,
            "madeBy": self.madeBy,
            # do not serialize the password, its a security breach
        }


class Calendar(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    selection = db.Column(db.String(200), unique=False, nullable=False)
    # stat_type = db.Column(db.Enum(StatusType),values_callable=lambda x: [str(stat.value) for stat in StatusType])
    

    def __repr__(self):
        return f'<Calendar {self.selection}>'

    def serialize(self):
        return {
            "selection": self.selection,
            "id": self.id,
            # do not serialize the password, its a security breach
        }