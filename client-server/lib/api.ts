const API_URL = process.env.NEXT_PUBLIC_API_URL;

export interface Conversation {
  thread_id: string;
  title: string;
  created_at: string;
  updated_at: string;
}

export interface Message {
  role: "user" | "assistant";
  content: string;
}

export async function createConversation(userId: string): Promise<Conversation> {
  const res = await fetch(`${API_URL}/conversations`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ user_id: userId }),
  });
  return res.json();
}

export async function listConversations(userId: string): Promise<Conversation[]> {
  const res = await fetch(`${API_URL}/conversations?user_id=${userId}`);
  return res.json();
}

export async function getConversationMessages(threadId: string): Promise<Message[]> {
  const res = await fetch(`${API_URL}/conversations/${threadId}/messages`);
  return res.json();
}

export async function deleteConversation(threadId: string): Promise<void> {
  await fetch(`${API_URL}/conversations/${threadId}`, { method: "DELETE" });
}

export async function sendChatMessage(message: string, threadId: string): Promise<string> {
  const res = await fetch(`${API_URL}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, thread_id: threadId }),
  });
  const data = await res.json();
  return data.reply;
}