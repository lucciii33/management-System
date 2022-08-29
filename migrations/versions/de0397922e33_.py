"""empty message

Revision ID: de0397922e33
Revises: 89669a3384f2
Create Date: 2022-08-29 23:16:52.748160

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'de0397922e33'
down_revision = '89669a3384f2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('order', sa.Column('status', sa.String(length=200), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('order', 'status')
    # ### end Alembic commands ###
