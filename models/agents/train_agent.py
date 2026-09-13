from langchain_core.messages import AIMessage

from tools.train_tool import search_trains
from state import TravelState


def train_agent(state: TravelState):

    train_data = search_trains(
        state.get("origin", ""),
        state["destination"],
        state["duration"],
        state["budget"]
    )

    return {
        "train_results": train_data,
        "messages": [AIMessage(content="Train information fetched.")],
        "llm_calls": state.get("llm_calls", 0) + 1
    }