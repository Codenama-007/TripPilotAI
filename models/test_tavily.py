# test_tavily.py — run this standalone: python test_tavily.py
from dotenv import load_dotenv
import os
from tavily import TavilyClient

load_dotenv()

key = os.getenv("TAVILY_API_KEY")
print("Key loaded:", bool(key), key[:8] + "..." if key else None)

client = TavilyClient(api_key=key)
result = client.search(query="best hotels in Hawaii", max_results=3)
print(result)