import operator
from typing import Annotated, TypedDict
from langchain_core.messages import AnyMessage


class TravelState(TypedDict):

    messages: Annotated[list[AnyMessage], operator.add]

    origin: str
    destination: str
    duration: str
    travel_mode: str
    budget: str

    destination_info: str
    location_info: str

    flight_results: str
    train_results: str
    hotel_results: str

    user_query: str
    iternary: str

    llm_calls: int