from pydantic import BaseModel, Field, model_validator, field_validator
from typing import ClassVar, List, Optional
import pycountry

class TransactionIn(BaseModel):
    transactionId: str = Field(..., min_length=1)
    sourceAccount: str = Field(..., min_length=1)
    destinationAccount: str = Field(..., min_length=1)
    amount: str = Field(..., min_length=1)
    currency: str = Field(..., min_length=3, max_length=3)

    ALLOWED_CURRENCIES: ClassVar[List[str]] = []  # we can skip this if using pycountry

    # Field-level validator
    @field_validator("currency")
    def validate_currency(cls, v: str) -> str:
        if not pycountry.currencies.get(alpha_3=v.upper()):
            raise ValueError(f"{v} is not a valid ISO 4217 currency code")
        return v.upper()

    # Model-level validator (replaces root_validator)
    @model_validator(mode="after")
    def check_accounts_and_amount(cls, values: "TransactionIn") -> "TransactionIn":
        if values.sourceAccount == values.destinationAccount:
            raise ValueError("sourceAccount and destinationAccount cannot be the same")
        try:
            if float(values.amount) <= 0:
                raise ValueError("amount must be a positive number")
        except ValueError:
            raise ValueError("amount must be a valid number")
        return values


class TransactionOut(TransactionIn):
  status: str
  createdAt: str
  processedAt: Optional[str]