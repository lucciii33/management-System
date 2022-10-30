"""empty message

Revision ID: 8b163cd9e550
Revises: 61b690356c1f
Create Date: 2022-10-30 17:14:12.235001

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8b163cd9e550'
down_revision = '61b690356c1f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('calendar', sa.Column('hour', sa.String(length=200), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('calendar', 'hour')
    # ### end Alembic commands ###
