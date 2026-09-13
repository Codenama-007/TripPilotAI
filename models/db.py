import os
from dotenv import load_dotenv
from pymongo import MongoClient
import certifi

load_dotenv()

mongo_client = MongoClient(
    os.getenv("MONGODB_URI"),
    tls=True,
    tlsCAFile=certifi.where(),
)
db = mongo_client[os.getenv("MONGODB_DB", "trippilot")]

conversations_collection = db["conversations"]
messages_collection = db["messages"]

# Helpful indexes — run once, safe to call on every startup
conversations_collection.create_index("user_id")
messages_collection.create_index("thread_id")