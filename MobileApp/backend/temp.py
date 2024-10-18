from fastapi import FastAPI, HTTPException, File, UploadFile
import shutil
from pymongo import MongoClient
from pydantic import BaseModel, Field
from typing import Optional
import bcrypt
from typing import List, Dict
from utils.kg import KG
import nest_asyncio
import os
from passlib.context import CryptContext
import pyotp
import qrcode
from io import BytesIO
import base64
from fastapi.responses import StreamingResponse

kg_instance = KG()
app = FastAPI()
nest_asyncio.apply()

# MongoDB Atlas configuration
MONGO_URI = "mongodb+srv://tnavadinnehru:BuX9rTqXWSG82yDk@docschat.q87dn.mongodb.net/"
DATABASE_NAME = "docschat"

# Connect to MongoDB Atlas
client = MongoClient(MONGO_URI)
db = client[DATABASE_NAME]
users_collection = db["users"]
documents_collection = db["documents"]

@app.get("/")
async def hello2():
    return {"name": "navadin"}

@app.get("/hello")
async def hello(name: str, age: int):
    return {"name": name, "age": age}

@app.post("/create_knowledge_graph")
async def create_knowledge_graph_api(kb_name: str, user: str, file: UploadFile = File(...)):
    try:
        # Define a temporary file path
        temp_file_path = f"./temp_files/{file.filename}"
        os.makedirs(os.path.dirname(temp_file_path), exist_ok=True)

        # Save the uploaded file to the temp directory
        with open(temp_file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)

        temp_file_path2 = f"/Users/navadinnehrut/Documents/iamneo/HR_RAG/temp_files/{file.filename}"
        
        # Create the knowledge graph using the temp file path
        kg_instance.create_knowledge_graph(temp_file_path2, kb_name, user)

        # Clean up the temporary file
        os.remove(temp_file_path)

        # Add document entry to MongoDB
        document_entry = {"kb_name": kb_name, "kb_path": temp_file_path2, "user": user}
        documents_collection.insert_one(document_entry)

        return {"status": "success"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class KBDetail(BaseModel):
    kb_name: str
    kb_path: str

class KBDetailsRequest(BaseModel):
    kb_details: List[KBDetail]

class QueryRequest(BaseModel):
    query: str

@app.post("/load-knowledge-graph")
async def load_knowledge_graph_endpoint(request: KBDetailsRequest):
    try:
        success = kg_instance.load_knowledge_graph(request.kb_details)
        if success:
            return {"message": "Knowledge graph loaded successfully"}
        else:
            raise HTTPException(status_code=500, detail="Failed to load knowledge graph")
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/query-knowledge-graph")
async def query_knowledge_graph_endpoint(request: QueryRequest):
    try:
        if not kg_instance.graph_vector_rag_query_engine:
            raise HTTPException(status_code=400, detail="Knowledge graph not loaded")

        response = await kg_instance.graph_vector_rag_query_engine.aquery(request.query)

        return {"response": response.response}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/user-documents/{username}")
async def get_user_documents(username: str):
    try:
        # Fetch documents from MongoDB based on username
        documents = list(documents_collection.find({"user": username}))

        if not documents:
            raise HTTPException(status_code=404, detail="User not found or no documents available for this user")

        document_names = [doc["kb_name"] for doc in documents]
        return {"username": username, "documents": document_names}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    

# class UserRegistration(BaseModel):
#     username: str = Field(..., min_length=3, max_length=50)
#     password: str = Field(..., min_length=8, max_length=50)
#     mfa_enabled: Optional[bool] = Field(False)

# @app.post("/register")
# async def register_user(user: UserRegistration):
#     try:
#         # Check if the user already exists
#         existing_user = users_collection.find_one({"username": user.username})
#         if existing_user:
#             raise HTTPException(status_code=400, detail="Username already exists")

#         # Hash the password using bcrypt
#         hashed_password = bcrypt.hashpw(user.password.encode('utf-8'), bcrypt.gensalt())

#         # Prepare the user data to be stored in MongoDB
#         user_data = {
#             "username": user.username,
#             "password": hashed_password.decode('utf-8'),
#             "MFA": user.mfa_enabled,
#         }

#         # Insert the user into the database
#         users_collection.insert_one(user_data)

#         return {"message": "User registered successfully"}

#     except Exception as e:
#         raise HTTPException(status_code=500, detail=str(e))





# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# # Pydantic models
# class UserLogin(BaseModel):
#     username: str
#     password: str

# @app.post("/login")
# async def login(user: UserLogin):
#     # Fetch the user from the database
#     user_data = users_collection.find_one({"username": user.username})
#     if not user_data:
#         raise HTTPException(status_code=401, detail="Invalid username or password")

#     # Verify the password
#     if not pwd_context.verify(user.password, user_data["password"]):
#         raise HTTPException(status_code=401, detail="Invalid username or password")

#     # If MFA is enabled, you can return a message asking for MFA code here (future implementation)
#     mfa_enabled = user_data.get("MFA", False)
    
#     return {
#         "message": "Login successful",
#         "mfa_enabled": mfa_enabled
#     }

# Password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic models
class UserRegistration(BaseModel):
    username: str = Field(..., min_length=3, max_length=50)
    password: str = Field(..., min_length=8, max_length=50)
    mfa_enabled: bool = Field(default=False)

class UserLogin(BaseModel):
    username: str
    password: str

class MFARequest(BaseModel):
    username: str
    mfa_code: str

@app.post("/register")
async def register_user(user: UserRegistration):
    try:
        # Check if the user already exists
        existing_user = users_collection.find_one({"username": user.username})
        if existing_user:
            return {"message": "Username already exists"}
            # raise HTTPException(status_code=400, detail="Username already exists")

        # Hash the password using bcrypt
        hashed_password = pwd_context.hash(user.password)

        # Prepare the user data to be stored in MongoDB
        user_data = {
            "username": user.username,
            "password": hashed_password,
            "MFA": user.mfa_enabled
        }

        # If MFA is enabled, generate TOTP secret and QR code
        if user.mfa_enabled:
            secret = pyotp.random_base32()  # Generate a random secret for TOTP
            user_data["mfa_secret"] = secret

            # Generate QR code for TOTP without issuer
            uri = pyotp.totp.TOTP(secret).provisioning_uri(user.username)
            img = qrcode.make(uri)

            # Save QR code to a BytesIO object
            buffered = BytesIO()
            img.save(buffered, format="PNG")
            buffered.seek(0)

            users_collection.insert_one(user_data)
            # return StreamingResponse(buffered, media_type="image/png", headers={"Content-Disposition": "attachment; filename=qrcode.png"})
            return {"qrcode": base64.b64encode(buffered.getvalue()).decode('utf-8')}
        users_collection.insert_one(user_data)

        # Insert the user into the database

        return {"message": "User registered successfully"}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/login")
async def login(user: UserLogin):
    # Fetch the user from the database
    user_data = users_collection.find_one({"username": user.username})
    if not user_data:
        return {"message": "Invalid username or password"}
        # raise HTTPException(status_code=401, detail="Invalid username or password")

    # Verify the password
    if not pwd_context.verify(user.password, user_data["password"]):
        return {"message": "Invalid username or password"}
        # raise HTTPException(status_code=401, detail="Invalid username or password")

    # Check if MFA is enabled
    mfa_enabled = user_data.get("MFA", False)
    
    return {
        "message": "Login successful",
        "mfa_enabled": mfa_enabled,
        "mfa_secret": user_data.get("mfa_secret")  # Send the secret to the client for verification purposes (optional)
    }

@app.post("/verify-mfa")
async def verify_mfa(mfa_request: MFARequest):
    user_data = users_collection.find_one({"username": mfa_request.username})
    if not user_data:
        raise HTTPException(status_code=404, detail="User not found")

    # Retrieve the stored MFA secret
    secret = user_data.get("mfa_secret")
    if not secret:
        raise HTTPException(status_code=403, detail="MFA is not enabled for this user")

    # Verify the MFA code
    totp = pyotp.TOTP(secret)
    if totp.verify(mfa_request.mfa_code):
        return {"message": "MFA verification successful"}
    else:
        return {"message": "Incorrect MFA code"}
        # raise HTTPException(status_code=403, detail="Invalid MFA code")