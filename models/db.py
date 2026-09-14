import os
from dotenv import load_dotenv
from pymongo import MongoClient
import certifi

load_dotenv()


# this is for getting the Cluster url (either local or atlas cloud)
mongo_client = MongoClient(
    os.getenv("MONGODB_URI"),
    tls=True,
    tlsCAFile=certifi.where(),
    serverSelectionTimeoutMS=5000, 
)

# this is for naming the database with respect to the cluster 
db = mongo_client[os.getenv("MONGODB_DB", "trippilot")]


conversations_collection = db["conversations"] # used for storing the Conversations with respect to the reasoning models
 
messages_collection = db["messages"] # this is for storing the messages from the reasoning models

# Helpful indexes — run once, safe to call on every startup
try:
    conversations_collection.create_index("user_id")
    messages_collection.create_index("thread_id")
except Exception as e:
    print(f"Warning: could not create indexes at startup: {e}")