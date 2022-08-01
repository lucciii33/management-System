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

class StatusType(enum.Enum):
    todo = "todo"
    inProgress = "inProgress"
    done = "done"

for stat in StatusType:
    print(stat.value)
class Project(db.Model):
    
    id = db.Column(db.Integer, primary_key=True)
    task = db.Column(db.String(200), unique=False, nullable=True)
    stat_type = db.Column(db.Enum(StatusType),values_callable=lambda x: [str(stat.value) for stat in StatusType])
    

    def __repr__(self):
        return f'<User {self.todo}>'

    def serialize(self):
        return {
            "task": self.task,
            "status_type": self.status_type,
            # do not serialize the password, its a security breach
        }
