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
    __tablename__ = "analytics"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    email = Column(Text, nullable=False, unique=True)
    chartKey = Column(Text, nullable=True)
    payload = Column(JSONB, nullable=False)
    createdAt = Column(
        DateTime(timezone=True),
        server_default=func.now(),
        nullable=False,
    )

    __table_args__ = (
        UniqueConstraint("email", name="analyticsEmail"),
    )
