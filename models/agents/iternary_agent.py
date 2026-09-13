from langchain_core.messages import HumanMessage, SystemMessage

from llm import LLM
from state import TravelState


def iternary_agent(state: TravelState):

    prompt = f"""
Create a {state["duration"]} travel itinerary from {state.get("origin", "")} to {state["destination"]}.

Travel Mode: {state["travel_mode"]}
Total Budget (hard limit, must not be exceeded): {state["budget"]}

Flights: {state.get("flight_results", "")}
Trains: {state.get("train_results", "")}
Hotels: {state.get("hotel_results", "")}
Destination Information: {state.get("destination_info", "")}
Location Information: {state.get("location_info", "")}

Include day-by-day activities, hotel recommendations, distances,
attractions, food, activities, culture, transportation, and expenses.

IMPORTANT: The total of all estimated costs you list MUST NOT exceed
the stated budget of {state["budget"]}. If your initial estimates would
exceed it, choose cheaper options and note that trade-off explicitly.

Do not invent exact distances or prices. Mark approximations clearly.
"""

    response = LLM.invoke([
        SystemMessage(content="You are a professional travel planner who always respects the stated budget as a hard limit."),
        HumanMessage(content=prompt)
    ])

    return {
        "iternary": response.content,
        "messages": [response],
        "llm_calls": state.get("llm_calls", 0) + 1
    }