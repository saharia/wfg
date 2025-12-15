from fastapi import APIRouter, BackgroundTasks
from app.graphql import graphql
from app.schemas import TransactionIn
from app.core.response import api_response
from fastapi import HTTPException
from app.cron.worker import process_transaction
router = APIRouter()

@router.post("/v1/webhooks/transactions")
async def webhook(txn: TransactionIn, bg: BackgroundTasks):

    query = """
    query transactionFilterByTxnId($txid: String!) {
      transactionCollection(filter: { transactionId: { eq: $txid } }) {
        edges {
          node {
            id
            status
          }
        }
      }
    }
    """

    existing = await graphql(query, {"txid": txn.transactionId})

    edges = (
      existing.get("data", {})
        .get("transactionCollection", {})
        .get("edges", [])
    )

    # 🔁 Idempotency check
    if edges:
      raise HTTPException(
        status_code=409,  # Conflict (duplicate)
        detail="Duplicate transaction"
      )

    mutation = """
    mutation InsertTxn($objects: [TransactionInsertInput]!) {
      insertIntotransactionCollection(objects: $objects) {
        records {
          id
          transactionId
          sourceAccount
          destinationAccount
          amount
          currency
          status
          createdAt
          processedAt
        }
      }
    }
    """

    await graphql(
        mutation,
        {
          "objects": [
            {
              **txn.dict(),
              "amount": str(txn.amount),  # BigFloat → string
              "status": "PROCESSING",
            }
          ]
        }
    )

    # ⏳ Background processing
    bg.add_task(process_transaction, txn.transactionId)

    return api_response(
      message="transaction received",
      data=None,
      status_code=202
    )


@router.get("/v1/transactions/{transactionId}")
async def get_transaction(transactionId: str):

    query = """
    query ($txid: String!) {
      transactionCollection(first: 1, filter: { transactionId: { eq: $txid } }) {
        edges {
          node {
            transactionId
            sourceAccount
            destinationAccount
            amount
            currency
            status
            createdAt
            processedAt
          }
        }
      }
    }
    """

    res = await graphql(query, {"txid": transactionId})

    edges = (
      res.get("data", {})
        .get("transactionCollection", {})
        .get("edges", [])
    )

    first_node = edges[0]["node"] if edges else None

    return api_response(
        message="transaction fetched",
        data=first_node,
        status_code=200
    )