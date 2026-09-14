from dotenv import load_dotenv
from fastapi import FastAPI , HTTPException
from fastapi.middleware.cors import CORSMiddleware
from langchain_core.messages import HumanMessage, AIMessage
from schemas import ChatResponse , ChatRequest , NewConversationRequest , ConversationOut
from graph import app_graph
from db import conversations_collection, messages_collection
import uuid
from datetime import datetime, timezone

load_dotenv()

app = FastAPI(title="TripPilot AI Backend")

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "https://client-server-bay.vercel.app/"
        # "https://your-production-domain.com",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# This is for creating a new chat conversation
@app.post("/conversations", response_model=ConversationOut)
async def create_conversation(payload: NewConversationRequest):

    thread_id = str(uuid.uuid4())
    now = datetime.now(timezone.utc).isoformat()

    doc = {
        "thread_id": thread_id,
        "user_id": payload.user_id,
        "title": "New Chat",
        "created_at": now,
        "updated_at": now,
    }

    conversations_collection.insert_one(doc)

    return ConversationOut(
        thread_id=thread_id,
        title=doc["title"],
        created_at=now,
        updated_at=now,
    )

# this part of the code is for getting all the conversation stored with respect to the id 
@app.get("/conversations", response_model=list[ConversationOut])
async def list_conversations(user_id: str):

    docs = conversations_collection.find(
        {"user_id": user_id}
    ).sort("updated_at", -1)

    return [
        ConversationOut(
            thread_id=d["thread_id"],
            title=d["title"],
            created_at=d["created_at"],
            updated_at=d["updated_at"],
        )
        for d in docs
    ]

# This part of the code is for getting a specific conversation 
@app.get("/conversations/{thread_id}/messages")
async def get_conversation_messages(thread_id: str):

    docs = messages_collection.find(
        {"thread_id": thread_id}
    ).sort("created_at", 1)

    result = []
    for d in docs:
        result.append({"role": "user", "content": d["user_message"]})
        result.append({"role": "assistant", "content": d["assistant_reply"]})

    return result

# THis is for deleting a specific Conversation 
@app.delete("/conversations/{thread_id}")
async def delete_conversation(thread_id: str):

    conversations_collection.delete_one({"thread_id": thread_id})
    messages_collection.delete_many({"thread_id": thread_id})

    return {"status": "deleted"}

# This Endpoint is used for Chatting With Respect to the Reasoning Model 
@app.post("/chat", response_model=ChatResponse)
async def chat(payload: ChatRequest):

    conversation = conversations_collection.find_one({"thread_id": payload.thread_id})
    if not conversation:
        raise HTTPException(status_code=404, detail="Conversation not found")

    config = {"configurable": {"thread_id": payload.thread_id}}

    final_ai_message = None

    for event in app_graph.stream(
        {
            "messages": [HumanMessage(content=payload.message)],
            "user_query": payload.message,
        },
        config=config,
        stream_mode="updates"
    ):
        for _, node_output in event.items():
            if not node_output:
                continue
            for msg in node_output.get("messages", []):
                if isinstance(msg, AIMessage):
                    final_ai_message = msg

    reply = final_ai_message.content if final_ai_message else "Something went wrong."

    now = datetime.now(timezone.utc).isoformat()

    messages_collection.insert_one({
        "thread_id": payload.thread_id,
        "user_message": payload.message,
        "assistant_reply": reply,
        "created_at": now,
    })

    update_fields = {"updated_at": now}

    # Auto-title the conversation from the first user message
    if conversation.get("title") == "New Chat":
        update_fields["title"] = payload.message[:50]

    conversations_collection.update_one(
        {"thread_id": payload.thread_id},
        {"$set": update_fields}
    )

    return ChatResponse(reply=reply)

# this is a health route used for monitoring the render backend by the uptime robot this is to avoid sleeping of the backend 
@app.get("/health")
async def health():
    return {"status": "ok"}