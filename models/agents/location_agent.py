from langchain_core.messages import AIMessage

from tools.location_tool import search_location
from state import TravelState


def location_agent(state: TravelState):

    location_data = search_location(state["destination"])

    return {
        "location_info": location_data,
        "messages": [AIMessage(content="Hotel location and nearby attractions researched.")],
        "llm_calls": state.get("llm_calls", 0) + 1
    }