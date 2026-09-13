# from langgraph.checkpoint.memory import MemorySaver
from langgraph.graph import StateGraph, START, END
from langgraph.checkpoint.mongodb import MongoDBSaver
from db import mongo_client
from state import TravelState
from routers import information_router, travel_mode_router

from agents.travel_planner_agent import travel_planner_agent
from agents.flight_agent import flight_agent
from agents.train_agent import train_agent
from agents.hotel_agent import hotel_agent
from agents.destination_agent import destination_agent
from agents.location_agent import location_agent
from agents.iternary_agent import iternary_agent
from agents.final_agent import final_agent


def build_graph():

    graph = StateGraph(TravelState)

    graph.add_node("Travel Planner", travel_planner_agent)
    graph.add_node("Travel Mode Router", lambda state: {})
    graph.add_node("Flight Agent", flight_agent)
    graph.add_node("Train Agent", train_agent)
    graph.add_node("Hotel Agent", hotel_agent)
    graph.add_node("Destination Agent", destination_agent)
    graph.add_node("Location Agent", location_agent)
    graph.add_node("Iternary Agent", iternary_agent)
    graph.add_node("Final Agent", final_agent)

    graph.add_edge(START, "Travel Planner")

    graph.add_conditional_edges(
        "Travel Planner",
        information_router,
        {"ask_user": END, "continue": "Travel Mode Router"}
    )

    graph.add_conditional_edges(
        "Travel Mode Router",
        travel_mode_router,
        {"flight": "Flight Agent", "train": "Train Agent"}
    )

    graph.add_edge("Flight Agent", "Hotel Agent")
    graph.add_edge("Train Agent", "Hotel Agent")
    graph.add_edge("Hotel Agent", "Destination Agent")
    graph.add_edge("Destination Agent", "Location Agent")
    graph.add_edge("Location Agent", "Iternary Agent")
    graph.add_edge("Iternary Agent", "Final Agent")
    graph.add_edge("Final Agent", END)
    
    
    checkpointer = MongoDBSaver(mongo_client)
    return graph.compile(checkpointer=checkpointer) 


    # return graph.compile(checkpointer=MemorySaver())


app_graph = build_graph()