from tools.tavily_tool import tavily_search


def search_destination(destination: str):

    query = f"""
    Research {destination} for a tourist.

    Find:

    1. Must-try local food
    2. Popular activities
    3. Important cultural experiences
    4. Local customs
    5. Popular tourist attractions
    6. Famous local markets
    7. Unique local experiences

    Focus specifically on {destination}.
    """

    return tavily_search(query)