from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import mysql.connector
import uvicorn

app = FastAPI()

origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

db_config = {
    "user": "root",
    "password": "idhika",
    "host": "localhost",
    "database": "sihfinale",
}

def get_db_connection():
    return mysql.connector.connect(**db_config)

class UserCreate(BaseModel):
    id: int
    email: str
    name: str
    password: str
    position: str = "member"

@app.post("/add_user/")
async def add_user(request: UserCreate):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        
        # Correct the placeholders to use %s for all types
        cursor.execute(
            """
            INSERT INTO users (id, email, name, password, position)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (int(request.id), request.email, request.name, request.password, request.position)
        )
        
        connection.commit()
        return {"message": "User added successfully"}
    except Exception as e:
        connection.rollback()
        raise HTTPException(status_code=500, detail="An error occurred: " + str(e))
    finally:
        connection.close()
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
