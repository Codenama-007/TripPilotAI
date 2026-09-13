import json

from langchain_core.messages import AIMessage, HumanMessage, SystemMessage

from llm import LLM
from state import TravelState


def travel_planner_agent(state: TravelState):

    prompt = f"""
You are a travel planning assistant.

Extract the following information from the user's query:

1. Origin (where the user is traveling FROM)
2. Destination (where the user is traveling TO)
3. Duration
4. Travel mode
5. Budget

Current information:

Origin:
{state.get("origin", "")}

Destination:
{state.get("destination", "")}

Duration:
{state.get("duration", "")}

Travel Mode:
{state.get("travel_mode", "")}

Budget:
{state.get("budget", "")}

Latest User Query:
{state["user_query"]}

Do NOT invent missing information.

Return ONLY valid JSON.

Format:

{{
    "origin": "",
    "destination": "",
    "duration": "",
    "travel_mode": "",
    "budget": ""
}}

travel_mode must be either "plane", "train", or "".
"""

    response = LLM.invoke([
        SystemMessage(content="You extract structured travel information."),
        HumanMessage(content=prompt)
    ])

    try:
        content = response.content.strip()
        content = content.replace("```json", "").replace("```", "").strip()
        data = json.loads(content)
    except Exception:
        return {
            "messages": [
                AIMessage(content="I couldn't understand the travel details. Please provide your origin, destination, duration, travel mode and budget.")
            ],
            "llm_calls": state.get("llm_calls", 0) + 1
        }

    origin = str(data.get("origin") or state.get("origin", "")).strip()
    destination = str(data.get("destination") or state.get("destination", "")).strip()
    duration = str(data.get("duration") or state.get("duration", "")).strip()
    travel_mode = str(data.get("travel_mode") or state.get("travel_mode", "")).strip()
    budget = str(data.get("budget") or state.get("budget", "")).strip()

    if not destination:
        question = "Where would you like to travel?"
    elif not origin:
        question = "Where are you traveling from?"
    elif not duration:
        question = "How many days would you like to travel?"
    elif not travel_mode:
        question = "How would you like to travel — by plane or train?"
    elif not budget:
        question = "What is your budget for the trip?"
    else:
        question = "Great! I have all the information I need. Let me plan your trip."

    return {
        "origin": origin,
        "destination": destination,
        "duration": duration,
        "travel_mode": travel_mode,
        "budget": budget,
        "messages": [AIMessage(content=question)],
        "llm_calls": state.get("llm_calls", 0) + 1
    }