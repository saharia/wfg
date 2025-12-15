from fastapi.responses import JSONResponse

def api_response(
    *,
    success: bool = True,
    message: str = "",
    data=None,
    status_code: int = 200
):
    return JSONResponse(
        status_code=status_code,
        content={
            "success": success,
            "message": message,
            "data": data
        }
    )
