from tools.tavily_tool import tavily_search


def search_trains(origin: str, destination: str, duration: str, budget: str):

    query = f"""
    Find train travel options from {origin} to {destination}.

    Trip duration: {duration}
    Budget: {budget}

    Find:
    - Major railway routes
    - Important railway stations
    - Approximate train prices
    - Approximate travel times
    - Useful train passes if available
    """

    return tavily_search(query)