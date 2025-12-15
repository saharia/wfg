import asyncio
from datetime import datetime
import logging
from app.graphql import graphql

# Setup logger (or use your existing app logger)
logger = logging.getLogger(__name__)
logging.basicConfig(level=logging.INFO)

async def process_transaction(txn_id: str):
  try:
    logger.info("Starting processing transaction: %s", txn_id)
    
    # Simulate processing time
    await asyncio.sleep(10)

    mutation = """
    mutation UpdateTxn($txid: String!, $time: timestamptz!) {
      updatetransactionCollection(
        filter: { transactionId: { eq: $txid } }
        set: {
          status: "PROCESSED",
          processedAt: $time
        }
        atMost: 1
      ) {
        affectedCount
        records {
          id
          transactionId
        }
      }
    }
    """

    variables = {
      "txid": txn_id,
      "time": datetime.utcnow().isoformat()  # UTC ISO string
    }

    response = await graphql(mutation, variables)
    logger.info("Transaction processed successfully: %s, response: %s", txn_id, response)

  except Exception as e:
    # Catch all exceptions to prevent background task crash
    logger.exception("Background task failed for transaction: %s", txn_id, exc_info=e)
