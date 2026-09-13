from langchain_core.messages import HumanMessage, SystemMessage

from llm import LLM
from state import TravelState


def final_agent(state: TravelState):

    prompt = f"""
Generate the final travel recommendation.

Origin: {state.get("origin", "")}
Destination: {state["destination"]}
Duration: {state["duration"]}
Travel Mode: {state["travel_mode"]}
Total Budget (hard limit): {state["budget"]}

Flights: {state.get("flight_results", "")}
Trains: {state.get("train_results", "")}
Hotels: {state.get("hotel_results", "")}
Destination Information: {state.get("destination_info", "")}
Location Information: {state.get("location_info", "")}
Itinerary: {state.get("iternary", "")}

Give a clean, useful final response distinguishing real search
results from approximate recommendations.

IMPORTANT — Budget Breakdown Rules:
1. List each cost category (flights, accommodation, transportation, food, activities) with its own estimated amount.
2. Calculate the Total by ADDING these category amounts together — the Total must equal the sum of the categories listed above it.
3. The Total must not exceed {state["budget"]}. If your category estimates sum to more, reduce individual estimates until they fit, and note the trade-offs made.
4. Never restate the user's stated budget as the Total unless it is actually the sum of the categories above it.
"""

    response = LLM.invoke([
        SystemMessage(content="You are a meticulous professional travel assistant who always shows correct arithmetic and respects budget constraints."),
        HumanMessage(content=prompt)
    ])

    return {
        "messages": [response],
        "llm_calls": state.get("llm_calls", 0) + 1
    }