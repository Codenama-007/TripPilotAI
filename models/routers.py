from state import TravelState


def information_router(state: TravelState):

    if not state.get("destination"):
        return "ask_user"
    if not state.get("origin"):
        return "ask_user"
    if not state.get("duration"):
        return "ask_user"
    if not state.get("travel_mode"):
        return "ask_user"
    if not state.get("budget"):
        return "ask_user"

    return "continue"


def travel_mode_router(state: TravelState):

    travel_mode = state["travel_mode"].lower()

    if "plane" in travel_mode or "flight" in travel_mode:
        return "flight"
    elif "train" in travel_mode:
        return "train"

    return "flight"