from tools.tavily_tool import tavily_search


def search_flights(origin: str, destination: str, budget: str):

    query = f"""
    Find flight options from {origin} to {destination}.

    Budget: {budget}

    Find:
    - Major airlines operating this route
    - Approximate flight duration
    - Approximate one-way and round-trip prices
    - Any layover/connection information
    - Best booking platforms or tips

    Do not invent exact prices. Mark approximations clearly.
    """

    return tavily_search(query)