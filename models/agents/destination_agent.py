from langchain_core.messages import AIMessage

from tools.destination_tool import search_destination
from state import TravelState


def destination_agent(state: TravelState):

    destination_data = search_destination(state["destination"])

    return {
        "destination_info": destination_data,
        "messages": [AIMessage(content="Destination information fetched.")],
        "llm_calls": state.get("llm_calls", 0) + 1
    }