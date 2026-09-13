# from langchain_core.messages import HumanMessage, SystemMessage

# from llm import LLM
# from state import TravelState


# def final_agent(state: TravelState):

#     flight_results = str(state.get("flight_results", ""))[:4000]
#     train_results = str(state.get("train_results", ""))[:4000]
#     hotel_results = str(state.get("hotel_results", ""))[:4000]
#     destination_info = str(state.get("destination_info", ""))[:2500]
#     location_info = str(state.get("location_info", ""))[:2500]
#     itinerary = str(state.get("iternary", ""))[:4000]

#     prompt = f"""
# Generate the final travel recommendation.

# Origin: {state.get("origin", "")}
# Destination: {state["destination"]}
# Duration: {state["duration"]}
# Travel Mode: {state["travel_mode"]}
# Total Budget (hard limit): {state["budget"]}

# Flights: {flight_results}
# Trains: {train_results}
# Hotels: {hotel_results}
# Destination Information: {destination_info}
# Location Information: {location_info}
# Itinerary: {itinerary}

# Give a clean, useful final response distinguishing real search
# results from approximate recommendations.

# IMPORTANT — Budget Breakdown Rules:
# 1. List each cost category (flights, accommodation, transportation, food, activities) with its own estimated amount.
# 2. Calculate the Total by ADDING these category amounts together.
# 3. The Total must not exceed {state["budget"]}.
# 4. Never restate the user's stated budget as the Total unless it is actually the sum of the categories.
# """

#     response = LLM.invoke([
#         SystemMessage(
#             content="You are a meticulous professional travel assistant who always shows correct arithmetic and respects budget constraints."
#         ),
#         HumanMessage(content=prompt)
#     ])

#     return {
#         "messages": [response],
#         "llm_calls": state.get("llm_calls", 0) + 1
#     }


from langchain_core.messages import HumanMessage, SystemMessage

from llm import LLM
from state import TravelState


def final_agent(state: TravelState):

    # ---------------------------------------------------------
    # LIMIT LARGE TOOL OUTPUTS
    # ---------------------------------------------------------
    # The Final Agent does not need every character returned by
    # the search/API agents. Keeping these inputs bounded also
    # prevents Groq's TPM limit from being exceeded.

    flight_results = str(state.get("flight_results", ""))[:3000]
    train_results = str(state.get("train_results", ""))[:3000]
    hotel_results = str(state.get("hotel_results", ""))[:3000]
    destination_info = str(state.get("destination_info", ""))[:2000]
    location_info = str(state.get("location_info", ""))[:2000]
    itinerary = str(state.get("iternary", ""))[:3500]

    prompt = f"""
You are the Final Travel Planner.

Create a clean, professional and easy-to-read travel plan using
the information provided below.

TRIP DETAILS
Origin: {state.get("origin", "")}
Destination: {state["destination"]}
Duration: {state["duration"]}
Travel Mode: {state["travel_mode"]}
Total Budget: ₹{state["budget"]}

AVAILABLE TRAVEL DATA

Flights:
{flight_results}

Trains:
{train_results}

Hotels:
{hotel_results}

Destination Information:
{destination_info}

Location Information:
{location_info}

Itinerary:
{itinerary}


==================================================
OUTPUT FORMAT
==================================================

Return ONLY the final travel plan.

Do NOT include:
- Raw search results
- Search-result tables
- Long source descriptions
- "The sources you supplied"
- Repeated information
- A separate references section
- Internal agent information
- Unnecessary introductory or concluding paragraphs

Use the following structure:

# ✈️ {state["origin"]} → {state["destination"]}

**{state["duration"]} | Budget: ₹{state["budget"]} | Travel: {state["travel_mode"]}**

## 🗺️ Trip Overview

Give a short 2–3 sentence overview of the trip.

Then show the major route/cities in one simple line.

Example:
Mumbai → Sydney → Melbourne → Brisbane → Cairns → Mumbai


## 🏨 Where to Stay

Create a compact list:

**City**
- Hotel/hostel name
- Approximate nightly price
- Short reason why it is suitable

Only include accommodation information that is actually available
in the provided hotel data.


## 📅 Day-by-Day Itinerary

For every day, use this format:

### Day 1 — City

**Morning**
- Activity

**Afternoon**
- Activity

**Evening**
- Activity

**Stay:** Hotel/hostel

Keep each day concise.

Do not create activities that contradict the supplied itinerary.


## 💰 Budget Breakdown

Create a simple table:

| Category | Estimated Cost |
|---|---:|
| International flights | ₹X |
| Domestic transportation | ₹X |
| Accommodation | ₹X |
| Food | ₹X |
| Activities & entry fees | ₹X |
| Visa / insurance / miscellaneous | ₹X |
| **TOTAL** | **₹X** |

IMPORTANT — Budget Rules:

1. Each category must have its own estimated amount.
2. TOTAL must be the actual mathematical sum of the categories.
3. TOTAL must NOT exceed ₹{state["budget"]}.
4. Never simply copy ₹{state["budget"]} as TOTAL.
5. If the calculated costs exceed the budget, reduce optional
   activities or other flexible expenses and clearly mention the
   trade-off.
6. Do not invent an unrealistically low cost just to satisfy the
   budget.
7. Keep international and domestic transportation separate.
8. Accommodation should reflect the actual duration of the trip.


## 🍜 Must-Try Food

List 3–5 foods or dishes relevant to the destination.

Keep this section concise.


## 🎯 Must-Do Experiences

List 3–5 important experiences from the destination information
and itinerary.


## 💡 Travel Tips

Give 3–5 practical tips relevant to this specific trip.

Examples:
- Best way to move around
- Where to save money
- Important booking advice
- Weather considerations
- Local transport


## ⚠️ Important Note

Clearly distinguish between:
- information obtained from search/API results
- approximate estimates

Do not claim that an estimated price is guaranteed.

==================================================

STYLE RULES
==================================================

- Use Markdown headings.
- Use short paragraphs.
- Use bullet points instead of huge paragraphs.
- Use tables only for the budget.
- Keep the entire response concise.
- Do not repeat the same hotel, activity or cost multiple times.
- Prioritize useful travel information over explanations.
"""

    response = LLM.invoke([
        SystemMessage(
            content=(
                "You are a meticulous professional travel assistant. "
                "Produce concise, structured travel plans. "
                "Respect the supplied travel data and budget constraints. "
                "Never fabricate exact prices or search results. "
                "Always calculate the budget total mathematically."
            )
        ),
        HumanMessage(content=prompt)
    ])

    return {
        "messages": [response],
        "llm_calls": state.get("llm_calls", 0) + 1
    }

