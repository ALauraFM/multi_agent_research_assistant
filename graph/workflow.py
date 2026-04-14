# graph/workflow.py

from typing import TypedDict
from langgraph.graph import StateGraph, END

from agents.researcher import research
from agents.analyzer import analyze
from agents.writer import write_report


# estado compartilhado
class AgentState(TypedDict):
    topic: str
    research: str
    insights: str
    report: str


# nós (agents)
def researcher_node(state: AgentState):
    result = research(state["topic"])
    return {"research": result}


def analyzer_node(state: AgentState):
    insights = analyze(state["research"])
    return {"insights": insights}


def writer_node(state: AgentState):
    report = write_report(state["topic"], state["insights"])
    return {"report": report}


# construção do grafo
def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("researcher", researcher_node)
    graph.add_node("analyzer", analyzer_node)
    graph.add_node("writer", writer_node)

    graph.set_entry_point("researcher")

    graph.add_edge("researcher", "analyzer")
    graph.add_edge("analyzer", "writer")
    graph.add_edge("writer", END)

    return graph.compile()