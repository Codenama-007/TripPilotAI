from tools.tavily_tool import tavily_search


def search_location(destination: str):

    query = f"""
    Research tourist-friendly hotel locations in {destination}.

    Find:

    1. Popular tourist neighborhoods
    2. Main markets or shopping areas
    3. Popular attractions near those areas
    4. Approximate distance between hotels and markets
    5. Approximate distance to major attractions
    6. Nearby public transportation

    Clearly identify approximate distances.
    Do not invent exact distances.
    """

    return tavily_search(query)