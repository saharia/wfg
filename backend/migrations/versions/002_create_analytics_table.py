
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = "002_analytics_inputs"
down_revision = "001_create_transactions"
branch_labels = None
depends_on = None


def upgrade():
    # Ensure uuid extension exists (Supabase safe)
    op.execute('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";')

    op.create_table(
        "analytics",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            primary_key=True,
            server_default=sa.text("uuid_generate_v4()"),
        ),
        sa.Column("email", sa.Text(), nullable=False),
        sa.Column("chart_key", sa.Text(), nullable=False),
        sa.Column("payload", postgresql.JSONB(), nullable=False),
        sa.Column(
            "created_at",
            sa.DateTime(timezone=True),
            server_default=sa.text("now()"),
            nullable=False,
        ),
        sa.UniqueConstraint(
            "email",
            "chart_key",
            name="analytics_email_chart_key_key",
        ),
    )


def downgrade():
    op.drop_table("analytics")
