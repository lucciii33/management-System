"""empty message

Revision ID: e9e3d4ff9b18
Revises: a73e71cb790f
Create Date: 2022-08-12 23:35:00.105522

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e9e3d4ff9b18'
down_revision = 'a73e71cb790f'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('made_by', sa.String(length=50), nullable=True))
    op.drop_column('project', 'madeBy')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('project', sa.Column('madeBy', sa.VARCHAR(length=50), autoincrement=False, nullable=True))
    op.drop_column('project', 'made_by')
    # ### end Alembic commands ###
