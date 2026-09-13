from pydantic import BaseModel

class ChatRequest(BaseModel):
    message: str
    thread_id: str


class ChatResponse(BaseModel):
    reply: str
    
class NewConversationRequest(BaseModel):
    user_id: str


class ConversationOut(BaseModel):
    thread_id: str
    title: str
    created_at: str
    updated_at: str
