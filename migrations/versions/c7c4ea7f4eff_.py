"""empty message

Revision ID: c7c4ea7f4eff
Revises: 
Create Date: 2022-08-15 22:06:28.305844

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c7c4ea7f4eff'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('calendar',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('description', sa.String(length=200), nullable=False),
    sa.Column('start_time', sa.DateTime(timezone=True), nullable=True),
    sa.Column('end_time', sa.DateTime(timezone=True), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('in_and_out',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('person', sa.String(length=200), nullable=False),
    sa.Column('start_time', sa.DateTime(timezone=True), nullable=True),
    sa.Column('end_time', sa.DateTime(timezone=True), nullable=True),
    sa.Column('clock_in', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('project',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('task', sa.String(length=200), nullable=False),
    sa.Column('answer_type', sa.String(length=50), nullable=False),
    sa.Column('made_by', sa.String(length=50), nullable=True),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('staff',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('full_name', sa.String(length=200), nullable=False),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=80), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('user')
    op.drop_table('staff')
    op.drop_table('project')
    op.drop_table('in_and_out')
    op.drop_table('calendar')
    # ### end Alembic commands ###