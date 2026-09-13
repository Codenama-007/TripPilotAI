# from langchain_ollama import ChatOllama
# from dotenv import load_dotenv

# load_dotenv()


# LLM = ChatOllama(model="llama3.2:3b")

import os
from dotenv import load_dotenv
from langchain_groq import ChatGroq

load_dotenv()

LLM = ChatGroq(
    model="llama-3.3-70b-versatile",
    api_key=os.getenv("GROQ_API_KEY"),
    temperature=0.3,
)