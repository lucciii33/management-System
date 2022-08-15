"""empty message

Revision ID: 5cc497fca0ea
Revises: 7aa417071438
Create Date: 2022-08-15 15:15:03.593548

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '5cc497fca0ea'
down_revision = '7aa417071438'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('staff', sa.Column('full_name', sa.String(length=200), nullable=False))
    op.drop_column('staff', 'Full_name')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('staff', sa.Column('Full_name', sa.VARCHAR(length=200), autoincrement=False, nullable=False))
    op.drop_column('staff', 'full_name')
    # ### end Alembic commands ###
