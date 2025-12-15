from fastapi import FastAPI
from app.core.exceptions import register_exception_handlers
from datetime import datetime

app = FastAPI()

# 🔥 Register global exception handlers
register_exception_handlers(app)

# include routers
from app.routes.transactions import router as transaction_router
app.include_router(transaction_router)

@app.get("/")
def health():
  return {
    "status": "HEALTHY",
    "current_time": datetime.utcnow().isoformat() + "Z"
  }