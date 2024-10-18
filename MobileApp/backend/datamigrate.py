import json
from pymongo import MongoClient

# MongoDB Atlas configuration
MONGO_URI = "mongodb+srv://tnavadinnehru:BuX9rTqXWSG82yDk@docschat.q87dn.mongodb.net/"
DATABASE_NAME = "docschat"

# Path to the data.json file
DATA_FILE_PATH = "./data.json"

def migrate_data_to_mongodb():
    # Connect to MongoDB Atlas
    client = MongoClient(MONGO_URI)
    db = client[DATABASE_NAME]

    # Create or access collections
    users_collection = db["users"]
    documents_collection = db["documents"]

    # Load the data from data.json
    with open(DATA_FILE_PATH, "r") as file:
        data = json.load(file)

    # Insert user information into the users collection
    user_info = data["user_info"]
    for username, info in user_info.items():
        users_collection.update_one(
            {"username": username},
            {"$set": {
                "username": username,
                "password": info["password"],
                "MFA": info["MFA"]
            }},
            upsert=True
        )

    # Insert document information into the documents collection
    databases = data["databases"]
    for username, documents in databases.items():
        for document in documents:
            documents_collection.insert_one({
                "username": username,
                "kb_name": document["kb_name"],
                "kb_path": document["kb_path"]
            })

    print("Data migration to MongoDB Atlas completed successfully.")

if __name__ == "__main__":
    migrate_data_to_mongodb()