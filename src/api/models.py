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

class AnswerType(enum.Enum):
    no = 'No'
    yes = 'Yes'
    dont_know = 'Do not Know'

    def __str__(self):
        return self.value

class Project(db.Model):
    __tablename__ = "project"
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(200), unique=False, nullable=True)
    answer_type = db.Column(db.Enum(AnswerType), nullable=False)
    # stat_type = db.Column(db.Enum(StatusType),values_callable=lambda x: [str(stat.value) for stat in StatusType])
    

    def __repr__(self):
        return f'<User {self.todo}>'

    def serialize(self):
        return {
            "task": self.task,
            # do not serialize the password, its a security breach
        }
