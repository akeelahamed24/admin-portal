from fastapi import FastAPI, HTTPException, Form
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from pydantic import BaseModel
import mysql.connector
import uvicorn


app = FastAPI()

# CORS configuration
origins = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Database configuration
db_config = {
    "user": "root",
    "password": "tiger",
    "host": "localhost",
    "database": "sihfinale",
}

def get_db_connection():
    """Establish a connection to the database."""
    return mysql.connector.connect(**db_config)

# Pydantic model for creating a user
class UserCreate(BaseModel):
    id: int
    email: str
    name: str
    password: str
    position: str = "member"

# Endpoint to add a new user
@app.post("/add_user/")
async def add_user(request: UserCreate):
    try:
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute(
            """
            INSERT INTO users (id, email, name, password, position)
            VALUES (%s, %s, %s, %s, %s)
            """,
            (request.id, request.email, request.name, request.password, request.position),
        )
        connection.commit()
        return {"message": "User added successfully"}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        connection.close()

# Endpoint to get all users
@app.get("/users/")
async def get_users():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        return users
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        connection.close()

# Endpoint to get a user by ID
@app.get("/users/{id}")
async def get_user_by_id(id: int):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE id = %s", (id,))
        user = cursor.fetchone()
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        connection.close()

@app.post("/login/")
async def login(email: str = Form(...), password: str = Form(...)):
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users WHERE email = %s AND password = %s", (email, password))
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password")
        
        return {"message": "Login successful", "user": {"id": user["id"], "email": user["email"], "name": user["name"], "position": user["position"]}}
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        connection.close()

# Endpoint to fetch pipeline performance data
@app.get("/pipeline_performance/")
async def get_pipeline_performance():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT month, active_pipelines, gas_production, gas_consumption FROM pipeline_network")
        data = cursor.fetchall()
        return data
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        connection.close()

# Endpoint to fetch revenue breakdown data
@app.get("/revenue_breakdown/")
async def get_revenue_breakdown():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT name, value FROM revenue_breakdown")
        data = cursor.fetchall()
        return data
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        connection.close()

# Endpoint to fetch customer satisfaction data
@app.get("/customer_satisfaction/")
async def get_customer_satisfaction():
    try:
        connection = get_db_connection()
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT satisfaction_rating, complaints, feedback_count FROM customer_satisfaction")
        data = cursor.fetchall()
        return data
    except mysql.connector.Error as e:
        raise HTTPException(status_code=500, detail=f"Database error: {e}")
    finally:
        connection.close()




# Run the application
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
