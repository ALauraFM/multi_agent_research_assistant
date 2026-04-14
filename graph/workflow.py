# graph/workflow.py
MAX_ITERATIONS = 2
from typing import TypedDict
from langgraph.graph import StateGraph, END

from agents.researcher import research
from agents.analyzer import analyze
from agents.writer import write_report

from openai import OpenAI
from dotenv import load_dotenv

load_dotenv()
client = OpenAI()

class AgentState(TypedDict):
    topic: str
    research: str
    insights: str
    report: str
    review: str
    approved: bool
    iterations: int

def reviewer_node(state: AgentState):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[
            {
                "role": "system",
                "content": "Você é um revisor crítico. Avalie qualidade, clareza e profundidade."
            },
            {
                "role": "user",
                "content": f"""
Avalie o relatório abaixo.

Se estiver bom, responda apenas: APROVADO
Se estiver ruim, responda apenas: REPROVADO e diga o que melhorar.

Relatório:
{state["report"]}
"""
            }
        ]
    )

    review_text = response.choices[0].message.content

    approved = "APROVADO" in review_text

    return {
        "review": review_text,
        "approved": approved
    }


# nós (agents)
def researcher_node(state: AgentState):
    result = research(state["topic"])
    return {"research": result}

def analyzer_node(state: AgentState):
    insights = analyze(state["research"])
    
    return {
        "insights": insights,
        "iterations": state["iterations"] + 1
    }


def writer_node(state: AgentState):
    report = write_report(state["topic"], state["insights"])
    return {"report": report}


# construção do grafo
def build_graph():
    graph = StateGraph(AgentState)

    graph.add_node("researcher", researcher_node)
    graph.add_node("analyzer", analyzer_node)
    graph.add_node("writer", writer_node)
    graph.add_node("reviewer", reviewer_node)

    graph.set_entry_point("researcher")

    graph.add_edge("researcher", "analyzer")
    graph.add_edge("analyzer", "writer")
    graph.add_edge("writer", "reviewer")

    # decisão condicional
    def review_decision(state: AgentState):
        if state["approved"]:
            return END
        
        if state["iterations"] >= MAX_ITERATIONS:
            return END
        
        return "analyzer"


    return graph.compile()