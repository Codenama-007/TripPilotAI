from langchain_core.messages import AIMessage

from tools.tavily_tool import tavily_search
from state import TravelState


def hotel_agent(state: TravelState):

    user_query = f"""
Find budget-friendly hotels in:
Destination: {state["destination"]}
Trip Duration: {state["duration"]}
Total Budget: {state["budget"]}

Find hotels close to attractions, markets, and public transportation.
"""

    hotel_results = tavily_search(user_query)

    return {
        "hotel_results": hotel_results,
        "messages": [AIMessage(content="Hotel information fetched.")],
        "llm_calls": state.get("llm_calls", 0) + 1
    }