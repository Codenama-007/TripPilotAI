from tavily import TavilyClient
import os
import time
from dotenv import load_dotenv

load_dotenv()

client = TavilyClient(
    api_key=os.getenv("TAVILY_API_KEY")
)

def tavily_search(query, max_retries=3):

    last_error = None

    for attempt in range(max_retries):
        try:
            response = client.search(
                query=query,
                max_results=7
            )
            break
        except Exception as e:
            last_error = e
            time.sleep(1.5 * (attempt + 1))  # 1.5s, 3s, 4.5s backoff
    else:
        # All retries failed — return empty results instead of crashing the graph
        print(f"Tavily search failed after {max_retries} attempts: {last_error}")
        return []

    results = []

    for index, result in enumerate(response['results'], 1):
        title = result.get("title", "unknown")
        url = result.get("url", "")
        snippet = result.get("content", "").strip()

        if len(snippet) > 300:
            snippet = snippet[:300].rsplit(" ", 1)[0]
        results.append(
            {
                "title": title,
                "url": url,
                "snippet": snippet
            }
        )

    return results