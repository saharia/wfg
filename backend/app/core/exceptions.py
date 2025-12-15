from fastapi import Request, HTTPException
from fastapi.responses import JSONResponse
import httpx

from app.graphql import GraphQLError


def register_exception_handlers(app):

    @app.exception_handler(HTTPException)
    async def http_exception_handler(request: Request, exc: HTTPException):
        return JSONResponse(
            status_code=exc.status_code,
            content={
                "success": False,
                "message": exc.detail,
                "errors": None,
                "data": None
            }
        )

    @app.exception_handler(GraphQLError)
    async def graphql_exception_handler(request: Request, exc: GraphQLError):
        return JSONResponse(
            status_code=400,
            content={
                "success": False,
                "message": "GraphQL Error",
                "errors": exc.errors,
                "data": None
            }
        )

    @app.exception_handler(httpx.HTTPError)
    async def httpx_exception_handler(request: Request, exc: httpx.HTTPError):
        return JSONResponse(
            status_code=502,
            content={
                "success": False,
                "message": "Upstream HTTP Error",
                "errors": str(exc),
                "data": None
            }
        )

    @app.exception_handler(Exception)
    async def global_exception_handler(request: Request, exc: Exception):
        return JSONResponse(
            status_code=500,
            content={
                "success": False,
                "message": "Internal Server Error",
                "errors": str(exc),
                "data": None
            }
        )
