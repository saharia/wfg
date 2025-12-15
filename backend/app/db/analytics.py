# models/analytics_inputs.py
import uuid
from sqlalchemy import (
    Column,
    Text,
    DateTime,
    UniqueConstraint,
    func,
)
from sqlalchemy.dialects.postgresql import UUID, JSONB

from app.db.base import Base

class Analytics(Base):
    __tablename__ = "analytics_inputs"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(Text, nullable=False)
    chart_key = Column(Text, nullable=False)
    payload = Column(JSONB, nullable=False)
    created_at = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint("email", "chart_key", name="analytics_inputs_email_chart_key_key"),
    )
