import httpx
from app.config import SUPABASE_GRAPHQL_URL, SUPABASE_ANON_KEY

HEADERS = {
    "apikey": SUPABASE_ANON_KEY,
    "Authorization": f"Bearer {SUPABASE_ANON_KEY}",
}

class GraphQLError(Exception):
    """Custom exception for GraphQL errors"""
    def __init__(self, errors):
        self.errors = errors
        super().__init__(str(errors))

async def graphql(query: str, variables: dict = None):
    # print("GRAPHQL QUERY:", SUPABASE_GRAPHQL_URL, query, variables)
    async with httpx.AsyncClient(timeout=5) as client:
        res = await client.post(
            SUPABASE_GRAPHQL_URL,
            json={"query": query, "variables": variables},
            headers=HEADERS,
        )
        res.raise_for_status()  # HTTP errors

        data = res.json()
        
        # print("GRAPHQL RESPONSE:", data)

        # Check for GraphQL errors
        if "errors" in data and data["errors"]:
            raise GraphQLError(data["errors"])

        return data
