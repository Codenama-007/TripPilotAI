from langchain_core.messages import AIMessage

from tools.flight_tool import search_flights
from state import TravelState


def flight_agent(state: TravelState):

    flight_data = search_flights(
        state.get("origin", ""),
        state["destination"],
        state["budget"]
    )

    return {
        "flight_results": flight_data,
        "messages": [AIMessage(content="Flight information fetched.")],
        "llm_calls": state.get("llm_calls", 0) + 1
    }