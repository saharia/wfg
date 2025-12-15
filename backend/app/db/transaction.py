from sqlalchemy import Column, String, Numeric, DateTime, Enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid
import enum

from app.db.base import Base


class TransactionStatus(str, enum.Enum):
    PROCESSING = "PROCESSING"
    PROCESSED = "PROCESSED"


class Transaction(Base):
    __tablename__ = "transaction"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    transactionId = Column(String, unique=True, nullable=False)

    sourceAccount = Column(String, nullable=False)
    destinationAccount = Column(String, nullable=False)
    amount = Column(Numeric, nullable=False)
    currency = Column(String, nullable=False)

    status = Column(Enum(TransactionStatus, name="transaction_status"), nullable=False)

    createdAt = Column(DateTime(timezone=True), default=datetime.utcnow)
    processedAt = Column(DateTime(timezone=True)) 