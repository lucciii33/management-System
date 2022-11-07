"""empty message

Revision ID: 79ddc3cfa984
Revises: 8b163cd9e550
Create Date: 2022-11-07 22:14:22.597843

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '79ddc3cfa984'
down_revision = '8b163cd9e550'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.alter_column('calendar', 'hour',
               existing_type=sa.VARCHAR(length=200),
               nullable=True)
    op.add_column('item', sa.Column('item_type', sa.String(length=50), nullable=False))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('item', 'item_type')
    op.alter_column('calendar', 'hour',
               existing_type=sa.VARCHAR(length=200),
               nullable=False)
    # ### end Alembic commands ###
