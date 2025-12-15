from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

revision = "001_create_transactions"
down_revision = None

# Define ENUM once
transaction_status_enum = postgresql.ENUM(
    "PROCESSING",
    "PROCESSED",
    "FAILED",
    name="transactionStatus",
    create_type=False,  # 🔑 VERY IMPORTANT
)

def upgrade():
    op.execute('create extension if not exists "pgcrypto";')

    # Create ENUM only if not exists
    transaction_status_enum.create(op.get_bind(), checkfirst=True)

    op.create_table(
        "transaction",
        sa.Column("id", sa.UUID(), primary_key=True,
                  server_default=sa.text("gen_random_uuid()")),
        sa.Column("transactionId", sa.Text(), nullable=False, unique=True),
        sa.Column("sourceAccount", sa.Text(), nullable=False),
        sa.Column("destinationAccount", sa.Text(), nullable=False),
        sa.Column("amount", sa.Numeric(), nullable=False),
        sa.Column("currency", sa.Text(), nullable=False),
        sa.Column("status", transaction_status_enum, nullable=False),
        sa.Column("createdAt", sa.TIMESTAMP(timezone=True),
                  server_default=sa.text("now()")),
        sa.Column("processedAt", sa.TIMESTAMP(timezone=True)),
    )

def downgrade():
    op.drop_table("transaction")
    
    # Drop ENUM explicitly
    transaction_status_enum.drop(op.get_bind(), checkfirst=True)
